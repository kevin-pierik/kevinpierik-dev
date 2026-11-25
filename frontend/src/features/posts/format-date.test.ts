import { describe, expect, test } from "vitest";

import { formatDate } from "./format-date";

describe("formatDate", () => {
  test("formats the Amsterdam calendar date in English", () => {
    expect(formatDate("2026-11-17T12:00:00Z")).toBe("17 Nov 2026");
  });

  test("uses Amsterdam time around midnight", () => {
    expect(formatDate("2026-11-17T23:30:00Z")).toBe("18 Nov 2026");
    expect(formatDate("2026-07-17T22:30:00Z")).toBe("18 Jul 2026");
  });
});
