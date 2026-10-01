const TIME_FORMAT = new Intl.DateTimeFormat("ru-RU", {
  hour: "2-digit",
  minute: "2-digit",
});

export function formatTime(date: Date): string {
  return TIME_FORMAT.format(date);
}
