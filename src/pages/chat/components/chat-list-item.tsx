import { CellSimple, Counter, EllipsisText, Flex, Typography } from "@maxhub/max-ui";

import type { Chat } from "../../../shared/types";
import { ChatAvatar } from "../../../shared/ui/chat-avatar";

import classes from "./chat-list-item.module.css";

export interface ChatListItemProps {
  chat: Chat;
  active: boolean;
  onSelect: (chatId: string) => void;
}

export function ChatListItem({ chat, active, onSelect }: ChatListItemProps) {
  return (
    <CellSimple
      as="button"
      height="normal"
      subtitleMode="tertiary"
      aria-current={active ? "true" : undefined}
      data-active={active || undefined}
      className={classes.item}
      innerClassNames={{
        before: classes.before,
        content: classes.content,
        title: classes.title,
        subtitle: classes.subtitle,
        after: classes.after,
      }}
      onClick={() => onSelect(chat.id)}
      before={
        <ChatAvatar name={chat.name} size={64} avatarUrl={chat.avatarUrl} online={chat.online} />
      }
      title={<EllipsisText maxLines={1}>{chat.phone}</EllipsisText>}
      subtitle={<EllipsisText maxLines={2}>{chat.lastMessagePreview}</EllipsisText>}
      after={
        <Flex
          direction="column"
          align="flex-end"
          justify="space-between"
          gap="var(--spacing-size2xs)"
        >
          <Typography.Text variant="description" color="tertiary">
            {chat.lastMessageTime}
          </Typography.Text>
          {chat.unreadCount > 0 && (
            <Counter
              className={classes.counter}
              value={chat.unreadCount}
              variant="primary"
              rounded
            />
          )}
        </Flex>
      }
    />
  );
}
