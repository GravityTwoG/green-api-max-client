import type { MessageStatus } from "../types";

export type Credentials = {
  idInstance: string;
  apiTokenInstance: string;
  apiURL: string;
};

export type CheckAccountResult = {
  exist: boolean;
  chatId: string;
};

export type SendMessageResult = {
  idMessage: string;
};

export type QueuedMessage = {
  receiptId: number;
  body: NotificationBody;
};

export type NotificationBody = {
  typeWebhook: string;
  timestamp: number;
  idMessage: string;
  chatId?: string;
  status?: MessageStatus;
  description?: string;
  senderData?: {
    chatId: string;
    chatName: string;
    senderPhoneNumber: number;
  };
  messageData?: {
    typeMessage: string;
    textMessageData?: {
      textMessage: string;
    };
    extendedTextMessageData?: {
      text: string;
    };
  };
};

export enum ChatEventKind {
  Received = "received",
  Sent = "sent",
  Status = "status",
}

export type ChatEvent =
  | {
      kind: ChatEventKind.Received;
      idMessage: string;
      chatId: string;
      chatName: string;
      chatPhone: string;
      text: string;
      timestamp: number;
    }
  | {
      kind: ChatEventKind.Sent;
      idMessage: string;
      chatId: string;
      chatName: string;
      chatPhone: string;
      text: string;
      timestamp: number;
    }
  | {
      kind: ChatEventKind.Status;
      idMessage: string;
      chatId: string;
      status: MessageStatus;
    };
