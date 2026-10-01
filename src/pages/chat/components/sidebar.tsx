import { CellList, Panel } from "@maxhub/max-ui";

import type { Chat } from "../../../shared/types";
import { ChatListItem } from "./chat-list-item";
import { NewChatForm } from "./new-chat-form";

import classes from "./sidebar.module.css";

export interface SidebarProps {
  chats: Chat[];
  activeChatId: string | null;
  onChatCreate: (phone: string) => Promise<void>;
  onChatSelect: (chatId: string) => void;
}

export function Sidebar({ chats, activeChatId, onChatCreate, onChatSelect }: SidebarProps) {
  return (
    <Panel mode="primary" className={classes.sidebar}>
      <NewChatForm onSubmit={onChatCreate} />

      <CellList className={classes.list}>
        {chats.map((chat) => (
          <ChatListItem
            key={chat.id}
            chat={chat}
            active={chat.id === activeChatId}
            onSelect={onChatSelect}
          />
        ))}
      </CellList>
    </Panel>
  );
}
