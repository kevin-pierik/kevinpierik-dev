import { describe, expect, test } from "vitest";

import { isHomeUri, pageUri, uriSegments } from "./uri";

describe("pageUri", () => {
  test("joins route segments behind the language prefix", () => {
    expect(pageUri("en")).toBe("/");
    expect(pageUri("nl")).toBe("/nl");
    expect(pageUri("en", ["about", "me"])).toBe("/about/me");
    expect(pageUri("nl", ["over"])).toBe("/nl/over");
  });
});

describe("uriSegments", () => {
  test("turns a stored URI back into route segments", () => {
    expect(uriSegments("en", "/")).toEqual([]);
    expect(uriSegments("nl", "/nl")).toEqual([]);
    expect(uriSegments("nl", "/nl/over/mij")).toEqual(["over", "mij"]);
  });

  test("round-trips with pageUri", () => {
    expect(pageUri("en", uriSegments("en", "/a/b"))).toBe("/a/b");
  });
});

describe("isHomeUri", () => {
  test("recognises each language's homepage", () => {
    expect(isHomeUri("en", "/")).toBe(true);
    expect(isHomeUri("nl", "/nl")).toBe(true);
    expect(isHomeUri("nl", "/nl/over")).toBe(false);
  });
});
