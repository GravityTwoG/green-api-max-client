import { formatTime } from "../shared/time";
import type { Chat } from "../shared/types";

export const MOCK_CHATS: Chat[] = [
  {
    id: "chat-1",
    phone: "+7 999 123-45-67",
    name: "Анна Ковалёва",
    online: true,
    lastMessagePreview: "Договор уже подписан, жду остаток",
    lastMessageTime: "14:32",
    unreadCount: 2,
    messages: [
      {
        id: "m-1",
        direction: "outgoing",
        text: "Анна, привет! Отправляю счёт на оплату.",
        time: "14:20",
        status: "sent",
      },
      {
        id: "m-2",
        direction: "incoming",
        text: "Привет! Посмотрю после обеда и отпишусь.",
        time: "14:22",
        status: "sent",
      },
      {
        id: "m-3",
        direction: "outgoing",
        text: "Счёт прикреплён, реквизиты прежние.",
        time: "14:25",
        status: "sent",
      },
      {
        id: "m-4",
        direction: "incoming",
        text: "Ок, вижу счёт.",
        time: "14:27",
        status: "sent",
      },
      {
        id: "m-5",
        direction: "incoming",
        text: "Один вопрос по срокам оплаты: договор подписан вчера.",
        time: "14:27",
        status: "sent",
      },
      {
        id: "m-6",
        direction: "incoming",
        text: "Нужно подтвердить договор и подписать акт до конца месяца.",
        time: "14:31",
        status: "sent",
      },
      {
        id: "m-7",
        direction: "outgoing",
        text: "Напиши, пожалуйста, подробнее — я уточню у бухгалтера.",
        time: "14:32",
        status: "sent",
      },
      {
        id: "m-8",
        direction: "outgoing",
        text: "https://green-api.com/max/documents/contract-2024-04-17.pdf",
        time: "14:32",
        status: "failed",
      },
    ],
  },
  {
    id: "chat-2",
    phone: "+7 916 555-34-21",
    name: "Дмитрий Орлов",
    online: false,
    lastMessagePreview: "Во сколько встречаемся?",
    lastMessageTime: "Вчера",
    unreadCount: 0,
    messages: [
      {
        id: "m-8",
        direction: "incoming",
        text: "Во сколько встречаемся?",
        time: "18:40",
        status: "sent",
      },
    ],
  },
];

export function createMockChat(phone: string): Chat {
  return {
    id: `chat-${Date.now()}`,
    phone,
    name: "Новый чат",
    online: false,
    lastMessagePreview: "Нет сообщений",
    lastMessageTime: formatTime(new Date()),
    unreadCount: 0,
    messages: [],
  };
}
