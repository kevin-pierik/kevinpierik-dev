import { describe, expect, test } from "vitest";

import { absoluteUrl, isCurrentPath } from "./index";

describe("absoluteUrl", () => {
  test("prefixes internal paths with the site URL", () => {
    expect(absoluteUrl("/")).toBe("https://www.kevinpierik.dev");
    expect(absoluteUrl("/posts")).toBe("https://www.kevinpierik.dev/posts");
  });

  test("leaves external and protocol-relative URLs alone", () => {
    expect(absoluteUrl("https://github.com")).toBe("https://github.com");
    expect(absoluteUrl("//evil.example")).toBe("//evil.example");
  });
});

describe("isCurrentPath", () => {
  test("marks a section and its children as current", () => {
    expect(isCurrentPath("/posts", "/posts")).toBe(true);
    expect(isCurrentPath("/posts/hello", "/posts")).toBe(true);
  });

  test("does not match prefixes, the homepage, or a missing path", () => {
    expect(isCurrentPath("/postscript", "/posts")).toBe(false);
    expect(isCurrentPath("/posts", "/")).toBe(false);
    expect(isCurrentPath("/", "/")).toBe(true);
    expect(isCurrentPath(undefined, "/posts")).toBe(false);
  });
});
