import { describe, expect, test } from "vitest";

import { safeHref } from "./safe-href";

describe("safeHref", () => {
  test("keeps web, email, phone, and internal links", () => {
    expect(safeHref("https://www.friday.nl")).toBe("https://www.friday.nl");
    expect(safeHref("mailto:hello@kevinpierik.dev")).toBe(
      "mailto:hello@kevinpierik.dev",
    );
    expect(safeHref("tel:+31615545687")).toBe("tel:+31615545687");
    expect(safeHref("/blog")).toBe("/blog");
  });

  test("drops scripts, protocol-relative URLs, and malformed values", () => {
    expect(safeHref("javascript:alert(1)")).toBeUndefined();
    expect(safeHref("//evil.example")).toBeUndefined();
    expect(safeHref("not a url")).toBeUndefined();
    expect(safeHref(null)).toBeUndefined();
  });
});
