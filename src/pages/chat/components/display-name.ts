import type { Chat } from "../../../shared/types";

export function displayName(chat: Chat): string {
  return chat.name === "" ? chat.phone : chat.name;
}
