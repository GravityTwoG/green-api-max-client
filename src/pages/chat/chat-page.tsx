import { Button, Flex, Panel, Typography } from "@maxhub/max-ui";
import { useMemo } from "react";

import { GreenApiErrorCode } from "@/shared/api";
import { useMediaQuery } from "@/shared/hooks/use-media-query";
import { FormError } from "@/shared/ui/form-error";
import { LayoutBackground } from "@/shared/ui/layout-background";

import { ChatHeader } from "./components/chat-header";
import { MessageInput } from "./components/message-input";
import { MessageList } from "./components/message-list";
import { Sidebar } from "./components/sidebar";
import { useChats } from "./use-chats";

import classes from "./chat-page.module.css";

const ERROR_TEXT: Record<string, string> = {
  [GreenApiErrorCode.SendFailed]: "Не удалось отправить сообщение",
};

export function ChatPage() {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const {
    chats,
    activeChatId,
    subscriptionError,
    resubscribe,
    isSending,
    sendError,
    createChat,
    selectChat,
    closeChat,
    sendMessage,
  } = useChats();

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
          onChatCreate={createChat}
          onChatSelect={selectChat}
        />
      )}

      {showChat && (
        <Panel mode="secondary" className={classes.chat}>
          <LayoutBackground />

          {subscriptionError !== null && (
            <Flex
              align="center"
              justify="center"
              gap="var(--spacing-size-m)"
              className={classes.empty}
            >
              <FormError>{subscriptionError.message}</FormError>
              <Button size="small" variant="secondary" onClick={resubscribe}>
                Повторить
              </Button>
            </Flex>
          )}

          {activeChat === null ? (
            <Flex align="center" justify="center" className={classes.empty}>
              <Typography.Text variant="body" color="secondary">
                Выберите чат или создайте новый
              </Typography.Text>
            </Flex>
          ) : (
            <>
              <ChatHeader chat={activeChat} onGoBack={closeChat} />
              <MessageList messages={activeChat.messages} />

              {sendError !== null && (
                <FormError>{ERROR_TEXT[sendError.message] ?? sendError.message}</FormError>
              )}

              <MessageInput
                isSending={isSending}
                onSend={(text) => void sendMessage(activeChat.id, text)}
              />
            </>
          )}
        </Panel>
      )}
    </Flex>
  );
}
