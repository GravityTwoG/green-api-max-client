import { EllipsisText, Flex, IconButton, Typography } from "@maxhub/max-ui";

import type { Chat } from "../../../shared/types";
import { ChatAvatar } from "../../../shared/ui/chat-avatar";
import { ArrowLeftIcon } from "../../../shared/ui/icons";

import classes from "./chat-header.module.css";

export interface ChatHeaderProps {
  chat: Chat;
  onGoBack: () => void;
}

export function ChatHeader({ chat, onGoBack }: ChatHeaderProps) {
  return (
    <Flex align="center" gap="0" className={classes.header}>
      <IconButton
        type="button"
        size="small"
        variant="ghost"
        aria-label="Вернуться к списку чатов"
        className={classes.goBackButton}
        onClick={onGoBack}
      >
        <ArrowLeftIcon size={24} />
      </IconButton>

      <div className={classes.main}>
        <div className={classes.image}>
          <ChatAvatar name={chat.name} avatarUrl={chat.avatarUrl} online={chat.online} />
        </div>

        <div className={classes.content}>
          <EllipsisText maxLines={1} asChild>
            <Typography.Body variant="custom" className={classes.title}>
              {chat.phone}
            </Typography.Body>
          </EllipsisText>
        </div>
      </div>
    </Flex>
  );
}
