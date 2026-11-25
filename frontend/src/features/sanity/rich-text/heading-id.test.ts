import { describe, expect, test } from "vitest";

import { headingId } from "./index";

describe("headingId", () => {
  test("slugifies the heading text", () => {
    expect(headingId("About me", "fallback")).toBe("about-me");
  });

  test("falls back when the text is empty or reserved", () => {
    expect(headingId("", "heading-a")).toBe("heading-a");
    expect(headingId(null, "heading-a")).toBe("heading-a");
    expect(headingId("Post title", "heading-a")).toBe("heading-a");
    expect(headingId("Main", "heading-a")).toBe("heading-a");
  });
});
