import type { WretchError } from "wretch";

export enum GreenApiErrorCode {
  InvalidCredentials = "INVALID_CREDENTIALS",
  ChatNotFound = "CHAT_NOT_FOUND",
  SendFailed = "SEND_FAILED",
}

const STATUS_TO_CODE = new Map<number, GreenApiErrorCode>([
  [401, GreenApiErrorCode.InvalidCredentials],
  [403, GreenApiErrorCode.InvalidCredentials],
  [466, GreenApiErrorCode.InvalidCredentials],
]);

export function toGreenApiErrorCode(error: unknown): GreenApiErrorCode | null {
  const { status } = (error ?? {}) as Partial<WretchError>;
  return status === undefined ? null : (STATUS_TO_CODE.get(status) ?? null);
}
