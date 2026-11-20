import { describe, expect, test } from "vitest";

import { formatDate } from "./format-date";

describe("formatDate", () => {
  test("formats the UTC calendar date in English", () => {
    expect(formatDate("2026-11-17T23:30:00Z")).toBe("17 Nov 2026");
  });
});
