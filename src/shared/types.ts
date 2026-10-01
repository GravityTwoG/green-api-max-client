export interface GreenAPICredentials {
  idInstance: string;
  apiTokenInstance: string;
}

type MessageDirection = "incoming" | "outgoing";

export type MessageStatus = "sending" | "sent" | "failed";

export interface Message {
  id: string;
  direction: MessageDirection;
  text: string;
  time: string;
  status: MessageStatus;
}

export interface Chat {
  id: string;
  phone: string;
  name: string;
  avatarUrl?: string;
  online: boolean;
  lastMessagePreview: string;
  lastMessageTime: string;
  unreadCount: number;
  messages: Message[];
}
