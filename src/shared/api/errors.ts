export class AppError extends Error {
  readonly code: string;

  constructor(code: string) {
    super(code);
    this.name = "AppError";
    this.code = code;
  }
}
