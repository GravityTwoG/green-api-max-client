const TIME_FORMAT = new Intl.DateTimeFormat("ru-RU", {
  hour: "2-digit",
  minute: "2-digit",
});

export function formatTimestamp(timestamp: number): string {
  return TIME_FORMAT.format(new Date(timestamp * 1000));
}

export function nowInSeconds(): number {
  return Math.floor(Date.now() / 1000);
}
