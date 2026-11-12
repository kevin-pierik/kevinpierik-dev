import { ariaKeyshortcuts } from "@ui-sdk/core/shortcuts";

export const rebootKeys = ["enter", "escape", "f1"] as const;

export const rebootAriaKeyshortcuts = rebootKeys
  .map((keys) => ariaKeyshortcuts(keys))
  .join(" ");

export function isPlainKeyPress(event: KeyboardEvent) {
  return (
    !event.repeat &&
    !event.metaKey &&
    !event.ctrlKey &&
    !event.altKey &&
    !event.shiftKey
  );
}
