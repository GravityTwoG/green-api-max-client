import { Avatar } from "@maxhub/max-ui";
import { useMemo } from "react";

const GRADIENTS = ["red", "orange", "green", "blue", "purple"] as const;

interface ChatAvatarProps {
  name: string;
  size?: number;
}

function getInitials(name: string): string {
  const letters = name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((word) => word[0] ?? "")
    .join("");
  return letters.length > 0 ? letters.toUpperCase() : "?";
}

function getGradient(name: string): (typeof GRADIENTS)[number] {
  let hash = 0;
  for (const char of name) {
    hash = (hash + (char.codePointAt(0) ?? 0)) % GRADIENTS.length;
  }
  return GRADIENTS[hash] ?? "blue";
}

export function ChatAvatar({ name, size = 40 }: ChatAvatarProps) {
  const initials = useMemo(() => getInitials(name), [name]);
  const gradient = useMemo(() => getGradient(name), [name]);

  return (
    <Avatar.Container size={size}>
      <Avatar.Text gradient={gradient}>{initials}</Avatar.Text>
    </Avatar.Container>
  );
}
