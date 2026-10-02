import { Button, Input, Typography } from "@maxhub/max-ui";
import { type FormEvent, useState } from "react";

import { AppError, GreenApiErrorCode } from "../../../shared/api";
import { FormError } from "../../../shared/ui/form-error";

import classes from "./new-chat-form.module.css";

const ERROR_TEXT: Record<string, string> = {
  [GreenApiErrorCode.ChatNotFound]: "Номер не найден в MAX",
};

export interface NewChatFormProps {
  onSubmit: (phone: string) => Promise<void>;
}

export function NewChatForm({ onSubmit }: NewChatFormProps) {
  const [phone, setPhone] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const canSubmit = !isLoading && /\S/.test(phone);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!canSubmit) {
      return;
    }

    try {
      setIsLoading(true);
      setError(null);
      await onSubmit(phone.trim());
      setPhone("");
    } catch (thrown) {
      setError(
        thrown instanceof AppError ? (ERROR_TEXT[thrown.code] ?? thrown.message) : String(thrown),
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className={classes.root}>
      <Typography.Label variant="large-strong">Новый чат</Typography.Label>

      <form className={classes.form} onSubmit={handleSubmit}>
        <div className={classes.field}>
          <Input
            size="medium"
            type="tel"
            inputMode="tel"
            autoComplete="off"
            placeholder="+7 999 123-45-67"
            aria-label="Номер телефона"
            className={classes.input}
            value={phone}
            disabled={isLoading}
            onChange={(event) => setPhone(event.currentTarget.value)}
          />
        </div>
        <Button
          type="submit"
          size="small"
          variant="primary"
          loading={isLoading}
          disabled={!canSubmit}
        >
          Создать
        </Button>
      </form>

      {error !== null && <FormError>{error}</FormError>}
    </div>
  );
}
