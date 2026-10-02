import wretch from "wretch";
import queryString from "wretch/addons/queryString";

import { AppError, isAbortError, toError } from "./errors";
import { toGreenApiErrorCode } from "./green-api-error-code";
import {
  type ChatEvent,
  ChatEventKind,
  type CheckAccountResult,
  type Credentials,
  type NotificationBody,
  type QueuedMessage,
  type SendMessageResult,
} from "./green-api-types";

export type { Credentials };

const RECEIVE_TIMEOUT_SECONDS = 60;
const MIN_POLL_INTERVAL_MS = 5000;
const INCOMING_MESSAGE = "incomingMessageReceived";
const OUTGOING_STATUS = "outgoingMessageStatus";
const OUTGOING_MESSAGE = "outgoingMessageReceived";
const OUTGOING_API_MESSAGE = "outgoingAPIMessageReceived";
const TEXT_MESSAGE = "textMessage";
const EXTENDED_TEXT_MESSAGE = "extendedTextMessage";

type GreenAPI = ReturnType<typeof createAPI>;

export class GreenAPIClient {
  #api: GreenAPI;
  #token: string;

  constructor({ apiURL, idInstance, apiTokenInstance }: Credentials) {
    this.#api = createAPI(`${apiURL}/waInstance${idInstance}`);
    this.#token = apiTokenInstance;
  }

  async #request<T>(send: () => Promise<T>): Promise<T> {
    try {
      return await send();
    } catch (thrown) {
      if (isAbortError(thrown)) {
        throw thrown;
      }

      const code = toGreenApiErrorCode(thrown);
      throw code === null ? toError(thrown) : new AppError(code);
    }
  }

  checkInstance(): Promise<void> {
    return this.#request(async () => {
      await this.#api.get(`/getStateInstance/${this.#token}`).res();
    });
  }

  checkAccount(phoneNumber: string) {
    return this.#request(() =>
      this.#api
        .url(`/checkAccount/${this.#token}`)
        .post({ phoneNumber })
        .json<CheckAccountResult>(),
    );
  }

  sendMessage(chatId: string, message: string) {
    return this.#request(() =>
      this.#api
        .url(`/sendMessage/${this.#token}`)
        .post({ chatId, message })
        .json<SendMessageResult>(),
    );
  }

  subscribe({
    onEvent,
    onError,
  }: {
    onEvent: (event: ChatEvent) => void;
    onError: (error: Error) => void;
  }): () => void {
    const controller = new AbortController();
    const { signal } = controller;

    void (async () => {
      while (!signal.aborted) {
        try {
          const queued = await this.#receiveNotifications(signal);
          if (queued !== null) {
            const event = toChatEvent(queued.body);
            if (event) {
              onEvent(event);
            }

            await this.#ackNotification(queued.receiptId, signal);
          }

          await pause(MIN_POLL_INTERVAL_MS, signal);
        } catch (thrown) {
          if (isAbortError(thrown)) {
            return;
          }
          onError(toError(thrown));
          return;
        }
      }
    })();

    return function unsubscribe() {
      controller.abort();
    };
  }

  async #receiveNotifications(signal: AbortSignal): Promise<QueuedMessage | null> {
    const response = await this.#request(() =>
      this.#api
        .options({ signal })
        .query({ receiveTimeout: RECEIVE_TIMEOUT_SECONDS })
        .get(`/receiveNotification/${this.#token}`)
        .res(),
    );

    if (response.status === 204) {
      return null;
    }

    try {
      return (await response.json()) as QueuedMessage;
    } catch {
      return null;
    }
  }

  #ackNotification(receiptId: number, signal: AbortSignal): Promise<unknown> {
    return this.#request(async () => {
      await this.#api
        .options({ signal })
        .delete(`/deleteNotification/${this.#token}/${receiptId}`)
        .res();
    });
  }
}

function pause(ms: number, signal: AbortSignal): Promise<void> {
  return new Promise((resolve) => {
    if (signal.aborted) {
      resolve();
      return;
    }

    const timer = setTimeout(done, ms);
    signal.addEventListener("abort", done, { once: true });

    function done() {
      clearTimeout(timer);
      signal.removeEventListener("abort", done);
      resolve();
    }
  });
}

function createAPI(baseURL: string) {
  return wretch(baseURL).addon(queryString);
}

function readText(data: NonNullable<NotificationBody["messageData"]>): string | undefined {
  if (data.typeMessage === TEXT_MESSAGE) {
    return data.textMessageData?.textMessage;
  }

  if (data.typeMessage === EXTENDED_TEXT_MESSAGE) {
    return data.extendedTextMessageData?.text;
  }

  return undefined;
}

function toChatEvent(body: NotificationBody): ChatEvent | null {
  if (body.typeWebhook === OUTGOING_STATUS) {
    if (body.chatId === undefined || body.status === undefined) {
      return null;
    }

    return {
      kind: ChatEventKind.Status,
      idMessage: body.idMessage,
      chatId: body.chatId,
      status: body.status,
    };
  }

  const sender = body.senderData;
  const data = body.messageData;
  if (sender === undefined || data === undefined) {
    return null;
  }

  const isIncoming = body.typeWebhook === INCOMING_MESSAGE;
  const isOutgoing =
    body.typeWebhook === OUTGOING_MESSAGE || body.typeWebhook === OUTGOING_API_MESSAGE;
  if (!isIncoming && !isOutgoing) {
    return null;
  }

  const text = readText(data);
  if (text === undefined) {
    return null;
  }

  return {
    kind: isIncoming ? ChatEventKind.Received : ChatEventKind.Sent,
    idMessage: body.idMessage,
    chatId: sender.chatId,
    chatName: sender.chatName,
    chatPhone: sender.senderPhoneNumber === 0 ? "" : String(sender.senderPhoneNumber),
    text,
    timestamp: body.timestamp,
  };
}
