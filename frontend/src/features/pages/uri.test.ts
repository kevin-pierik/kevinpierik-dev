import { describe, expect, test } from "vitest";

import { isHomeUri, pageUri, uriSegments } from "./uri";

describe("pageUri", () => {
  test("joins route segments", () => {
    expect(pageUri()).toBe("/");
    expect(pageUri(["about", "me"])).toBe("/about/me");
  });
});

describe("uriSegments", () => {
  test("turns a stored URI back into route segments", () => {
    expect(uriSegments("/")).toEqual([]);
  });

  test("round-trips with pageUri", () => {
    expect(pageUri(uriSegments("/a/b"))).toBe("/a/b");
  });
});

describe("isHomeUri", () => {
  test("recognises the homepage", () => {
    expect(isHomeUri("/")).toBe(true);
    expect(isHomeUri("/about")).toBe(false);
  });
});
