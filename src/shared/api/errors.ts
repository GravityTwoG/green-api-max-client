export class AppError extends Error {
  readonly code: string;

  constructor(code: string) {
    super(code);
    this.name = "AppError";
    this.code = code;
  }
}

export function isAbortError(thrown: unknown): boolean {
  return thrown instanceof DOMException && thrown.name === "AbortError";
}

export function toError(thrown: unknown): Error {
  return thrown instanceof Error ? thrown : new Error(String(thrown));
}
