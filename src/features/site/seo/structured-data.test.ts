import { describe, expect, it } from "bun:test";

import {
  breadcrumbStructuredData,
  profileStructuredData,
} from "./structured-data";

describe("breadcrumbStructuredData", () => {
  it("creates a Schema.org BreadcrumbList with ordered items", () => {
    const result = breadcrumbStructuredData([
      { name: "Home", url: "https://example.com/" },
      { name: "Projects", url: "https://example.com/projects" },
      {
        name: "My Project",
        url: "https://example.com/projects/my-project",
      },
    ]);

    expect(result).toEqual({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: "https://example.com/",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Projects",
          item: "https://example.com/projects",
        },
        {
          "@type": "ListItem",
          position: 3,
          name: "My Project",
          item: "https://example.com/projects/my-project",
        },
      ],
    });
  });

  it("returns an empty item list when no breadcrumbs are provided", () => {
    expect(breadcrumbStructuredData([])).toEqual({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [],
    });
  });
});

describe("profileStructuredData", () => {
  it("continues to return the profile graph", () => {
    const result = profileStructuredData();

    expect(result["@context"]).toBe("https://schema.org");
    expect(result["@graph"]).toHaveLength(3);
    expect(result["@graph"].map((item) => item["@type"])).toEqual([
      "WebSite",
      "ProfilePage",
      "Person",
    ]);
  });
});
