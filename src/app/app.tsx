import { MaxUI, useAppearance } from "@maxhub/max-ui";
import { type PropsWithChildren } from "react";

import { ChatPage } from "../pages/chat/chat-page";
import { LoginPage } from "../pages/login/login-page";
import { useAuth } from "../shared/providers/auth-context";

export function App() {
  const { isAuthenticated } = useAuth();

  return (
    <MaxUI>
      <ThemedScreen>{isAuthenticated ? <ChatPage /> : <LoginPage />}</ThemedScreen>
    </MaxUI>
  );
}

function ThemedScreen({ children }: PropsWithChildren) {
  const { colorScheme } = useAppearance();

  return <div data-color-scheme={colorScheme}>{children}</div>;
}
