import { describe, expect, test } from "vitest";

import { alternatePaths } from "./alternates";

describe("alternatePaths", () => {
  test("maps each translation to its path and always includes the current page", () => {
    expect(
      alternatePaths("en", "/about", [
        { language: "en", path: "/about" },
        { language: "nl", path: "/nl/over" },
      ]),
    ).toEqual({ en: "/about", nl: "/nl/over" });
  });

  test("skips missing translations and unknown languages", () => {
    expect(
      alternatePaths("nl", "/nl", [null, { language: "fr", path: "/fr" }]),
    ).toEqual({ nl: "/nl" });
  });
});
