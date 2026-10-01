import { useState } from "react";

import { AppError, GreenApiErrorCode } from "../shared/api";
import { formatTime } from "../shared/time";
import type { Chat, GreenAPICredentials, Message } from "../shared/types";
import { createMockChat, MOCK_CHATS } from "./mocks";

const MIN_ID_INSTANCE_LENGTH = 6;
const MIN_TOKEN_LENGTH = 10;
const MIN_PHONE_DIGITS = 10;
const RESPONSE_DELAY_MS = 700;

export interface MockChatSession {
  isAuthenticated: boolean;
  chats: Chat[];
  activeChatId: string | null;
  login: (credentials: GreenAPICredentials) => Promise<void>;
  createChat: (phone: string) => Promise<void>;
  selectChat: (chatId: string) => void;
  closeChat: () => void;
  sendMessage: (chatId: string, text: string) => void;
}

function countDigits(value: string): number {
  return value.replace(/\D/g, "").length;
}

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => {
    window.setTimeout(resolve, ms);
  });
}

export function useMockChat(): MockChatSession {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [chats, setChats] = useState<Chat[]>(MOCK_CHATS);
  const [activeChatId, setActiveChatId] = useState<string | null>(null);

  async function login(credentials: GreenAPICredentials): Promise<void> {
    await delay(RESPONSE_DELAY_MS);

    const isValid =
      credentials.idInstance.length >= MIN_ID_INSTANCE_LENGTH &&
      credentials.apiTokenInstance.length >= MIN_TOKEN_LENGTH;

    if (!isValid) {
      throw new AppError(GreenApiErrorCode.InvalidCredentials);
    }
    setIsAuthenticated(true);
  }

  async function createChat(phone: string): Promise<void> {
    await delay(RESPONSE_DELAY_MS);

    if (countDigits(phone) < MIN_PHONE_DIGITS) {
      throw new AppError(GreenApiErrorCode.ChatNotFound);
    }

    const chat = createMockChat(phone);
    setChats((current) => [chat, ...current]);
    setActiveChatId(chat.id);
  }

  function sendMessage(chatId: string, text: string) {
    const message: Message = {
      id: `message-${Date.now()}`,
      direction: "outgoing",
      text,
      time: formatTime(new Date()),
      status: "sending",
    };

    setChats((current) =>
      current.map((chat) =>
        chat.id === chatId
          ? {
              ...chat,
              lastMessagePreview: text,
              lastMessageTime: message.time,
              messages: [...chat.messages, message],
            }
          : chat,
      ),
    );

    window.setTimeout(() => {
      setChats((current) =>
        current.map((chat) =>
          chat.id === chatId
            ? {
                ...chat,
                messages: chat.messages.map((item) =>
                  item.id === message.id ? { ...item, status: "sent" as const } : item,
                ),
              }
            : chat,
        ),
      );
    }, RESPONSE_DELAY_MS);
  }

  return {
    isAuthenticated,
    chats,
    activeChatId,
    login,
    createChat,
    selectChat: setActiveChatId,
    closeChat: () => setActiveChatId(null),
    sendMessage,
  };
}
