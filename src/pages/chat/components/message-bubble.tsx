import { Typography } from "@maxhub/max-ui";

import { formatTimestamp } from "@/shared/time";
import { type Message, MessageDirection, MessageStatus } from "@/shared/types";
import { ReadIcon, SentIcon, WarningIcon } from "@/shared/ui/icons";

import classes from "./message-bubble.module.css";

export interface MessageBubbleProps {
  message: Message;
  hasPrevious?: boolean;
  hasNext?: boolean;
}

const STATUS_LABELS: Record<MessageStatus, string> = {
  [MessageStatus.Sent]: "Отправлено",
  [MessageStatus.Delivered]: "Доставлено",
  [MessageStatus.Read]: "Прочитано",
  [MessageStatus.Failed]: "Ошибка отправки",
};

export function MessageBubble({
  message,
  hasPrevious = false,
  hasNext = false,
}: MessageBubbleProps) {
  const direction = message.direction;
  const isOutgoing = direction === MessageDirection.Outgoing;

  return (
    <div className={classes.row} data-direction={direction}>
      <div
        className={classes.bubble}
        data-direction={direction}
        data-has-previous={hasPrevious || undefined}
        data-has-next={hasNext || undefined}
      >
        <Typography.Body variant="medium" className={classes.text}>
          {message.text}
        </Typography.Body>

        <div className={classes.meta}>
          <Typography.Text variant="tag" className={classes.time}>
            {formatTimestamp(message.timestamp)}
          </Typography.Text>

          {isOutgoing && (
            <span className={classes.indicators}>
              <MessageStatusIcon status={message.status} />
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

function MessageStatusIcon({ status }: { status: MessageStatus }) {
  if (status === MessageStatus.Failed) {
    return (
      <WarningIcon
        size={16}
        className={classes.statusFailed}
        aria-label={STATUS_LABELS[MessageStatus.Failed]}
      />
    );
  }

  if (status === MessageStatus.Read) {
    return (
      <ReadIcon
        size={16}
        className={classes.statusRead}
        aria-label={STATUS_LABELS[MessageStatus.Read]}
      />
    );
  }

  return <SentIcon size={16} className={classes.statusSent} aria-label={STATUS_LABELS[status]} />;
}
