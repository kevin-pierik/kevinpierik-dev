import { describe, expect, test } from "vitest";

import { proxyPath } from "./proxy-path";

describe("proxyPath", () => {
  test("rewrites unprefixed paths to the default locale", () => {
    expect(proxyPath("/")).toEqual({ type: "rewrite", pathname: "/en" });
    expect(proxyPath("/posts/hello")).toEqual({
      type: "rewrite",
      pathname: "/en/posts/hello",
    });
  });

  test("redirects the default locale prefix to the unprefixed path", () => {
    expect(proxyPath("/en")).toEqual({ type: "redirect", pathname: "/" });
    expect(proxyPath("/en/posts")).toEqual({
      type: "redirect",
      pathname: "/posts",
    });
  });

  test("passes other locales and the default locale's Open Graph images through", () => {
    expect(proxyPath("/nl")).toEqual({ type: "next" });
    expect(proxyPath("/nl/posts/hallo")).toEqual({ type: "next" });
    expect(proxyPath("/en/opengraph-image-1a6tik")).toEqual({ type: "next" });
  });

  test("does not treat a segment that only starts with a locale as a locale", () => {
    expect(proxyPath("/english")).toEqual({
      type: "rewrite",
      pathname: "/en/english",
    });
    expect(proxyPath("/nlx")).toEqual({ type: "rewrite", pathname: "/en/nlx" });
  });
});
