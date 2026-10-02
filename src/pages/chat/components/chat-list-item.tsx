import { CellSimple, EllipsisText, Flex, Typography } from "@maxhub/max-ui";

import { formatTimestamp } from "@/shared/time";
import type { Chat } from "@/shared/types";
import { ChatAvatar } from "@/shared/ui/chat-avatar";

import { displayName } from "./display-name";

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
      before={<ChatAvatar name={displayName(chat)} size={64} />}
      title={<EllipsisText maxLines={1}>{displayName(chat)}</EllipsisText>}
      subtitle={<EllipsisText maxLines={2}>{chat.lastMessagePreview}</EllipsisText>}
      after={
        <Flex direction="column" align="flex-end" justify="space-between">
          <Typography.Text variant="description" color="tertiary">
            {formatTimestamp(chat.lastMessageTimestamp)}
          </Typography.Text>
        </Flex>
      }
    />
  );
}
