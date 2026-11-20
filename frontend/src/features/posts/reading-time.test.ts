import { describe, expect, test } from "vitest";

import { countWords, readingMinutes } from "./reading-time";

describe("countWords", () => {
  test("counts words, numbers, contractions, and hyphenated words once", () => {
    expect(countWords("Don’t over-engineer it, 2 times.")).toBe(5);
  });

  test("ignores punctuation and whitespace", () => {
    expect(countWords("  — … !  ")).toBe(0);
  });
});

describe("readingMinutes", () => {
  test("rounds up at 200 words a minute, with a minimum of one", () => {
    expect(readingMinutes("")).toBe(1);
    expect(readingMinutes("word ".repeat(200))).toBe(1);
    expect(readingMinutes("word ".repeat(201))).toBe(2);
  });
});
