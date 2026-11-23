import { describe, expect, it } from "vitest";

import sanityImageLoader from "./image-loader";

const src =
  "https://cdn.sanity.io/images/abc/production/hash-1600x1000.jpg?rect=0,0,1600,900&auto=format";

describe("sanityImageLoader", () => {
  it("keeps the crop and sets width, quality, and format", () => {
    const url = new URL(sanityImageLoader({ src, width: 828, quality: 60 }));
    expect(url.searchParams.get("rect")).toBe("0,0,1600,900");
    expect(url.searchParams.get("w")).toBe("828");
    expect(url.searchParams.get("q")).toBe("60");
    expect(url.searchParams.get("fit")).toBe("max");
    expect(url.searchParams.getAll("auto")).toEqual(["format"]);
  });

  it("defaults quality to 75", () => {
    const url = new URL(sanityImageLoader({ src, width: 640 }));
    expect(url.searchParams.get("q")).toBe("75");
  });
});
