import { IconButton, Textarea } from "@maxhub/max-ui";
import { type FormEvent, type KeyboardEvent, useLayoutEffect, useRef, useState } from "react";

import { SendIcon } from "../../../shared/ui/icons";

import classes from "./message-input.module.css";

const MAX_ROWS = 12;

export interface MessageInputProps {
  disabled?: boolean;
  onSend: (text: string) => void;
}

export function MessageInput({ disabled = false, onSend }: MessageInputProps) {
  const [text, setText] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const canSend = text.trim() !== "" && !disabled;

  useLayoutEffect(
    function resizeField() {
      const element = textareaRef.current;
      if (element === null) {
        return;
      }

      const computed = window.getComputedStyle(element);
      const lineHeight =
        Number.parseFloat(computed.lineHeight) || Number.parseFloat(computed.fontSize) * 1.2;
      const padding =
        Number.parseFloat(computed.paddingTop) + Number.parseFloat(computed.paddingBottom);
      const maxHeight = lineHeight * MAX_ROWS + padding;

      // A textarea never shrinks on its own, so the only way to read its natural
      // content height is to collapse it first. That reset and the final size are kept
      // to one write each, with all measurement done up front.
      element.style.height = "auto";
      const contentHeight = element.scrollHeight;

      element.style.cssText = `height: ${Math.min(contentHeight, maxHeight)}px; overflow-y: ${
        contentHeight > maxHeight ? "auto" : "hidden"
      };`;
    },
    [text],
  );

  function send() {
    if (!canSend) {
      return;
    }
    onSend(text.trim());
    setText("");
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    send();
  }

  function handleKeyDown(event: KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key !== "Enter" || event.shiftKey || event.nativeEvent.isComposing) {
      return;
    }
    event.preventDefault();
    send();
  }

  return (
    <form className={classes.composer} onSubmit={handleSubmit}>
      <Textarea
        ref={textareaRef}
        mode="primary"
        rows={1}
        placeholder="Сообщение"
        aria-label="Сообщение"
        value={text}
        disabled={disabled}
        className={classes.field}
        innerClassNames={{ textarea: classes.textarea }}
        onChange={(event) => setText(event.currentTarget.value)}
        onKeyDown={handleKeyDown}
      />

      <div className={classes.send}>
        <IconButton
          type="submit"
          size="xsmall"
          variant="primary"
          aria-label="Отправить сообщение"
          disabled={!canSend}
        >
          <SendIcon size={24} />
        </IconButton>
      </div>
    </form>
  );
}
