import { describe, expect, test } from "vitest";

import {
  breadcrumbStructuredData,
  profileStructuredData,
} from "./structured-data";

describe("breadcrumbStructuredData", () => {
  test("creates a Schema.org BreadcrumbList with ordered items", () => {
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

  test("returns an empty item list when no breadcrumbs are provided", () => {
    expect(breadcrumbStructuredData([])).toEqual({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [],
    });
  });
});

describe("profileStructuredData", () => {
  test("resolves every @id reference within the graph", () => {
    const [, profilePage] = profileStructuredData["@graph"];
    const ids = profileStructuredData["@graph"].map((node) => node["@id"]);

    expect(ids).toContain(profilePage.isPartOf["@id"]);
    expect(ids).toContain(profilePage.mainEntity["@id"]);
  });
});
