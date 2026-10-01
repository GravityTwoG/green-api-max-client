import { Spinner, Typography } from "@maxhub/max-ui";

import type { Message, MessageStatus } from "../../../shared/types";
import { ReadIcon, WarningIcon } from "../../../shared/ui/icons";

import classes from "./message-bubble.module.css";

export interface MessageBubbleProps {
  message: Message;
  hasPrevious?: boolean;
  hasNext?: boolean;
}

const STATUS_LABELS: Record<MessageStatus, string> = {
  sending: "Отправляется",
  sent: "Отправлено",
  failed: "Ошибка отправки",
};

export function MessageBubble({
  message,
  hasPrevious = false,
  hasNext = false,
}: MessageBubbleProps) {
  const direction = message.direction === "outgoing" ? "outgoing" : "incoming";
  const isOutgoing = direction === "outgoing";
  const hasMeta = message.time.length > 0;

  return (
    <div className={classes.row} data-direction={direction}>
      <div
        className={classes.bubble}
        data-direction={direction}
        data-has-previous={hasPrevious || undefined}
        data-has-next={hasNext || undefined}
        data-has-meta={hasMeta || undefined}
      >
        <Typography.Body variant="medium" className={classes.text}>
          {message.text}
        </Typography.Body>

        {hasMeta && (
          <div className={classes.meta}>
            <Typography.Text variant="tag" className={classes.time}>
              {message.time}
            </Typography.Text>

            {isOutgoing && (
              <span className={classes.indicators}>
                <MessageStatusIcon status={message.status} />
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function MessageStatusIcon({ status }: { status: MessageStatus }) {
  if (status === "sending") {
    return <Spinner size={12} appearance="contrast-static" aria-label={STATUS_LABELS.sending} />;
  }

  if (status === "failed") {
    return (
      <WarningIcon size={16} className={classes.statusFailed} aria-label={STATUS_LABELS.failed} />
    );
  }

  return <ReadIcon size={16} className={classes.statusSent} aria-label={STATUS_LABELS.sent} />;
}
