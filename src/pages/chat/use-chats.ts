import { useCallback, useEffect, useState } from "react";

import { AppError, type ChatEvent, ChatEventKind, GreenApiErrorCode } from "@/shared/api";
import { useAPI } from "@/shared/providers/api-context";
import { nowInSeconds } from "@/shared/time";
import { type Chat, type Message, MessageDirection, MessageStatus } from "@/shared/types";

export function useChats() {
  const { client } = useAPI();
  const [chats, setChats] = useState<Chat[]>([]);
  const [activeChatId, setActiveChatId] = useState<string | null>(null);
  const [subscriptionError, setSubscriptionError] = useState<Error | null>(null);
  const [attempt, setAttempt] = useState(0);
  const [isSending, setIsSending] = useState(false);
  const [sendError, setSendError] = useState<Error | null>(null);

  const createChat = useCallback(
    async (phone: string) => {
      if (client === null) {
        throw new AppError(GreenApiErrorCode.ChatNotFound);
      }

      const { exist, chatId } = await client.checkAccount(normalizePhoneNumber(phone));
      if (!exist) {
        throw new AppError(GreenApiErrorCode.ChatNotFound);
      }

      setChats((current) =>
        current.some((chat) => chat.id === chatId)
          ? current
          : [newChat(chatId, "", phone), ...current],
      );
      setActiveChatId(chatId);
    },
    [client],
  );

  const sendMessage = useCallback(
    async (chatId: string, text: string) => {
      if (client === null) {
        return;
      }

      try {
        setIsSending(true);
        setSendError(null);
        const { idMessage } = await client.sendMessage(chatId, text);
        setChats((current) =>
          replaceChat(current, chatId, (chat) =>
            addMessage(chat, {
              id: idMessage,
              direction: MessageDirection.Outgoing,
              text,
              timestamp: nowInSeconds(),
              status: MessageStatus.Sent,
            }),
          ),
        );
      } catch {
        setSendError(new AppError(GreenApiErrorCode.SendFailed));
      } finally {
        setIsSending(false);
      }
    },
    [client],
  );

  useEffect(
    function subscribeToNotifications() {
      if (client === null) {
        return;
      }

      return client.subscribe({
        onEvent: (event) => {
          setChats((current) => applyEvent(current, event));
        },
        onError: (error) => {
          setSubscriptionError(error);
        },
      });
    },
    [client, attempt],
  );

  return {
    chats,
    activeChatId,
    subscriptionError,
    isSending,
    sendError,
    resubscribe: () => {
      setSubscriptionError(null);
      setAttempt((current) => current + 1);
    },
    createChat,
    selectChat: setActiveChatId,
    closeChat: () => setActiveChatId(null),
    sendMessage,
  };
}

function normalizePhoneNumber(phone: string): string {
  return phone.replace(/\D/g, "");
}

function newChat(id: string, name: string, phone: string): Chat {
  return {
    id,
    name,
    phone,
    lastMessagePreview: "Нет сообщений",
    lastMessageTimestamp: nowInSeconds(),
    messages: [],
  };
}

function replaceChat(chats: Chat[], chatId: string, change: (chat: Chat) => Chat): Chat[] {
  return chats.map((chat) => (chat.id === chatId ? change(chat) : chat));
}

function addMessage(chat: Chat, message: Message): Chat {
  const index = chat.messages.findIndex((item) => compareByTime(item, message) > 0);
  let messages;
  if (index === -1) {
    messages = [...chat.messages, message];
  } else {
    messages = [...chat.messages.slice(0, index), message, ...chat.messages.slice(index)];
  }

  return withLastMessage({
    ...chat,
    messages,
  });
}

function updateMessage(chat: Chat, idMessage: string, patch: Partial<Message>): Chat {
  return {
    ...chat,
    messages: chat.messages.map((item) => (item.id === idMessage ? { ...item, ...patch } : item)),
  };
}

function withLastMessage(chat: Chat): Chat {
  const last = chat.messages[chat.messages.length - 1];
  if (last === undefined) {
    return chat;
  }

  return {
    ...chat,
    lastMessagePreview: last.text,
    lastMessageTimestamp: last.timestamp,
  };
}

function applyEvent(chats: Chat[], event: ChatEvent): Chat[] {
  if (event.kind === ChatEventKind.Status) {
    return replaceChat(chats, event.chatId, (chat) =>
      updateMessage(chat, event.idMessage, { status: event.status }),
    );
  }

  const isIncoming = event.kind === ChatEventKind.Received;
  const message: Message = {
    id: event.idMessage,
    direction: isIncoming ? MessageDirection.Incoming : MessageDirection.Outgoing,
    text: event.text,
    timestamp: event.timestamp,
    status: MessageStatus.Sent,
  };

  if (!chats.some((chat) => chat.id === event.chatId)) {
    const chat = newChat(event.chatId, event.chatName, event.chatPhone);
    return [addMessage(chat, message), ...chats];
  }

  return replaceChat(chats, event.chatId, (chat) => {
    const knownChat = chat.messages.find((item) => item.id === event.idMessage);
    return knownChat === undefined
      ? addMessage(chat, message)
      : addMessage(
          { ...chat, messages: chat.messages.filter((item) => item.id !== event.idMessage) },
          { ...knownChat, timestamp: event.timestamp },
        );
  });
}

function compareByTime(a: Message, b: Message): number {
  return a.timestamp - b.timestamp;
}
