import { MaxUI, useAppearance } from "@maxhub/max-ui";
import { type PropsWithChildren } from "react";

import { ChatPage } from "../pages/chat/chat-page";
import { LoginPage } from "../pages/login/login-page";
import { useMockChat } from "./use-mock-chat";

export function App() {
  const {
    isAuthenticated,
    chats,
    activeChatId,
    login,
    createChat,
    selectChat,
    closeChat,
    sendMessage,
  } = useMockChat();

  return (
    <MaxUI>
      <ThemedScreen>
        {isAuthenticated ? (
          <ChatPage
            chats={chats}
            activeChatId={activeChatId}
            onChatCreate={createChat}
            onChatSelect={selectChat}
            onChatClose={closeChat}
            onMessageSend={sendMessage}
          />
        ) : (
          <LoginPage onLogin={login} />
        )}
      </ThemedScreen>
    </MaxUI>
  );
}

function ThemedScreen({ children }: PropsWithChildren) {
  const { colorScheme } = useAppearance();

  return <div data-color-scheme={colorScheme}>{children}</div>;
}
