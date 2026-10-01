import { useLayoutEffect, useRef } from "react";

import type { Message } from "../../../shared/types";
import { MessageBubble } from "./message-bubble";

import classes from "./message-list.module.css";

export interface MessageListProps {
  messages: Message[];
}

export function MessageList({ messages }: MessageListProps) {
  const listRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(
    function scrollToBottom() {
      const element = listRef.current;
      if (element) {
        element.scrollTop = element.scrollHeight;
      }
    },
    [messages],
  );

  return (
    <div ref={listRef} className={classes.list}>
      <div className={classes.feed}>
        {messages.map((message, index) => {
          const previous = messages[index - 1];
          const next = messages[index + 1];
          const hasPrevious = previous !== undefined && previous.direction === message.direction;
          const hasNext = next !== undefined && next.direction === message.direction;

          return (
            <div
              key={message.id}
              className={classes.message}
              data-has-previous={hasPrevious || undefined}
              data-has-next={hasNext || undefined}
            >
              <MessageBubble message={message} hasPrevious={hasPrevious} hasNext={hasNext} />
            </div>
          );
        })}

        <div className={classes.spacer} />
      </div>
    </div>
  );
}
