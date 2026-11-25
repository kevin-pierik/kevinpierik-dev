import { describe, expect, test } from "vitest";

import { mailtoUrl, pageMarkdown } from "./webmcp";

const llmsFull = [
  "# Kevin Pierik — Frontend Developer",
  "# Home\n\nURL: https://www.kevinpierik.dev\n\nAbout me",
  "# Projects\n\nURL: https://www.kevinpierik.dev/projects",
  "# A post\n\nURL: https://www.kevinpierik.dev/posts/a\nPublished: 2026-11-25\n\nText",
].join("\n\n---\n\n");

describe("pageMarkdown", () => {
  test("picks the document with the page's canonical URL", () => {
    expect(pageMarkdown(llmsFull, "/")).toBe(
      "# Home\n\nURL: https://www.kevinpierik.dev\n\nAbout me",
    );
    expect(pageMarkdown(llmsFull, "/projects")).toBe(
      "# Projects\n\nURL: https://www.kevinpierik.dev/projects",
    );
  });

  test("returns undefined for a page that isn't there", () => {
    expect(pageMarkdown(llmsFull, "/missing")).toBeUndefined();
  });
});

describe("mailtoUrl", () => {
  test("encodes spaces as %20, not +", () => {
    expect(
      mailtoUrl("hello@kevinpierik.dev", "A & B", "Hi Kevin,\nThanks"),
    ).toBe(
      "mailto:hello@kevinpierik.dev?subject=A%20%26%20B&body=Hi%20Kevin%2C%0AThanks",
    );
  });
});
