import { Button, Flex, IconButton, Input, Panel, Typography } from "@maxhub/max-ui";
import { type FormEvent, useState } from "react";

import { AppError, GreenApiErrorCode } from "../../shared/api";
import { useAuth } from "../../shared/providers/auth-context";
import { FormError } from "../../shared/ui/form-error";
import { EyeCrossedIcon, EyeIcon } from "../../shared/ui/icons";
import { LayoutBackground } from "../../shared/ui/layout-background";

import classes from "./login-page.module.css";

const ERROR_TEXT: Record<string, string> = {
  [GreenApiErrorCode.InvalidCredentials]: "Неверные данные инстанса",
};

export function LoginPage() {
  const auth = useAuth();
  const [idInstance, setIdInstance] = useState("");
  const [apiTokenInstance, setApiTokenInstance] = useState("");
  const [isTokenVisible, setIsTokenVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const canSubmit = !isLoading && /\S/.test(idInstance) && /\S/.test(apiTokenInstance);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!canSubmit) {
      return;
    }

    try {
      setIsLoading(true);
      setError(null);
      await auth.signIn({
        idInstance: idInstance.trim(),
        apiTokenInstance: apiTokenInstance.trim(),
      });
    } catch (thrown) {
      setError(
        thrown instanceof AppError ? (ERROR_TEXT[thrown.code] ?? thrown.message) : String(thrown),
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Panel mode="secondary" className={classes.root}>
      <LayoutBackground />
      <Flex align="center" justify="center" className={classes.wrapper}>
        <Panel mode="primary" className={classes.card}>
          <Typography.Headline variant="large-strong">Вход</Typography.Headline>

          <form className={classes.form} onSubmit={handleSubmit}>
            <Flex direction="column" align="stretch" gap="var(--spacing-size2xl)">
              <Flex direction="column" align="stretch" gap="var(--spacing-size-m)">
                <Typography.Text variant="detail" color="secondary">
                  idInstance
                </Typography.Text>
                <Input
                  size="large"
                  autoComplete="username"
                  placeholder="1101123456"
                  aria-label="idInstance"
                  value={idInstance}
                  disabled={isLoading}
                  onChange={(event) => setIdInstance(event.currentTarget.value)}
                />
              </Flex>

              <Flex direction="column" align="stretch" gap="var(--spacing-size-m)">
                <Typography.Text variant="detail" color="secondary">
                  apiTokenInstance
                </Typography.Text>
                <Input
                  size="large"
                  type={isTokenVisible ? "text" : "password"}
                  autoComplete="current-password"
                  placeholder="d75b3a66e9e483aad1605e4f4c5e2f1a2b3c4d5"
                  aria-label="apiTokenInstance"
                  value={apiTokenInstance}
                  disabled={isLoading}
                  onChange={(event) => setApiTokenInstance(event.currentTarget.value)}
                  iconAfter={
                    <IconButton
                      type="button"
                      size="xsmall"
                      variant="ghost"
                      aria-label={isTokenVisible ? "Скрыть токен" : "Показать токен"}
                      aria-pressed={isTokenVisible}
                      disabled={isLoading}
                      onClick={() => setIsTokenVisible((visible) => !visible)}
                    >
                      {isTokenVisible ? <EyeCrossedIcon size={20} /> : <EyeIcon size={20} />}
                    </IconButton>
                  }
                />
              </Flex>

              {error !== null && <FormError>{error}</FormError>}
            </Flex>

            <Button
              type="submit"
              size="medium"
              variant="primary"
              stretched
              loading={isLoading}
              disabled={!canSubmit}
            >
              Войти
            </Button>
          </form>
        </Panel>
      </Flex>
    </Panel>
  );
}
