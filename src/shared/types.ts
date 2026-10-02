export enum MessageDirection {
  Incoming = "incoming",
  Outgoing = "outgoing",
}

export enum MessageStatus {
  Sent = "sent",
  Delivered = "delivered",
  Read = "read",
  Failed = "failed",
}

export interface Message {
  id: string;
  direction: MessageDirection;
  text: string;
  timestamp: number;
  status: MessageStatus;
}

export interface Chat {
  id: string;
  name: string;
  phone: string;
  lastMessagePreview: string;
  lastMessageTimestamp: number;
  messages: Message[];
}
