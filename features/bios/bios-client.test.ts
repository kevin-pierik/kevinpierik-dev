import { describe, expect, it } from "vitest";

import { isPlainKeyPress } from "./bios-client";

const press = (init: Partial<KeyboardEvent>) =>
  ({
    repeat: false,
    metaKey: false,
    ctrlKey: false,
    altKey: false,
    shiftKey: false,
    ...init,
  }) as KeyboardEvent;

describe("isPlainKeyPress", () => {
  it("accepts a single press without modifiers", () => {
    expect(isPlainKeyPress(press({}))).toBe(true);
  });

  it.each(["repeat", "metaKey", "ctrlKey", "altKey", "shiftKey"] as const)(
    "rejects a press with %s",
    (flag) => {
      expect(isPlainKeyPress(press({ [flag]: true }))).toBe(false);
    },
  );
});
