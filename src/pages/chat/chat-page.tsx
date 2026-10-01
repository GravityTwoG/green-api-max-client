import { Flex, Panel, Typography } from "@maxhub/max-ui";
import { useMemo } from "react";

import { useMediaQuery } from "../../shared/hooks/use-media-query";
import type { Chat } from "../../shared/types";
import { LayoutBackground } from "../../shared/ui/layout-background";
import { ChatHeader } from "./components/chat-header";
import { MessageInput } from "./components/message-input";
import { MessageList } from "./components/message-list";
import { Sidebar } from "./components/sidebar";

import classes from "./chat-page.module.css";

export interface ChatPageProps {
  chats: Chat[];
  activeChatId: string | null;
  onChatCreate: (phone: string) => Promise<void>;
  onChatSelect: (chatId: string) => void;
  onChatClose: () => void;
  onMessageSend: (chatId: string, text: string) => void;
}

export function ChatPage({
  chats,
  activeChatId,
  onChatCreate,
  onChatSelect,
  onChatClose,
  onMessageSend,
}: ChatPageProps) {
  const isMobile = useMediaQuery("(max-width: 768px)");

  const activeChat = useMemo(
    () => chats.find((chat) => chat.id === activeChatId) ?? null,
    [chats, activeChatId],
  );

  const showSidebar = !isMobile || activeChat === null;
  const showChat = !isMobile || activeChat !== null;

  return (
    <Flex direction="row" className={classes.root}>
      {showSidebar && (
        <Sidebar
          chats={chats}
          activeChatId={activeChatId}
          onChatCreate={onChatCreate}
          onChatSelect={onChatSelect}
        />
      )}

      {showChat && (
        <Panel mode="secondary" className={classes.chat}>
          <LayoutBackground />

          {activeChat === null ? (
            <Flex align="center" justify="center" className={classes.empty}>
              <Typography.Text variant="body" color="secondary">
                Выберите чат или создайте новый
              </Typography.Text>
            </Flex>
          ) : (
            <>
              <ChatHeader chat={activeChat} onGoBack={onChatClose} />
              <MessageList messages={activeChat.messages} />
              <MessageInput onSend={(text) => onMessageSend(activeChat.id, text)} />
            </>
          )}
        </Panel>
      )}
    </Flex>
  );
}
