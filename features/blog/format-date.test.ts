import { describe, expect, test } from "vitest";

import { formatDate } from "./format-date";

describe("formatDate", () => {
  test("formats the UTC calendar date per language", () => {
    expect(formatDate("en", "2026-11-17T23:30:00Z")).toBe("17 Nov 2026");
    expect(formatDate("nl", "2026-11-17T00:00:00Z")).toBe("17 nov 2026");
  });
});
