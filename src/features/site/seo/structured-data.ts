export type BreadcrumbItem = {
  name: string;
  url: string;
};

export function profileStructuredData() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": "https://www.kevinpierik.dev/#website",
        name: "Kevin Pierik",
        url: "https://www.kevinpierik.dev",
        description:
          "Frontend developer focused on clear, useful interfaces in Hardenberg, the Netherlands.",
        inLanguage: "en",
      },
      {
        "@type": "ProfilePage",
        "@id": "https://www.kevinpierik.dev/#webpage",
        url: "https://www.kevinpierik.dev",
        name: "Frontend Developer | Kevin Pierik",
        description:
          "Frontend developer focused on clear, useful interfaces in Hardenberg, the Netherlands.",
        inLanguage: "en",
        isPartOf: { "@id": "https://www.kevinpierik.dev/#website" },
        mainEntity: { "@id": "https://www.kevinpierik.dev/#person" },
      },
      {
        "@type": "Person",
        "@id": "https://www.kevinpierik.dev/#person",
        name: "Kevin Pierik",
        url: "https://www.kevinpierik.dev",
        email: "kevinpierik@icloud.com",
        description:
          "Frontend developer focused on clear, useful interfaces in Hardenberg, the Netherlands.",
        jobTitle: "Frontend Developer",
        homeLocation: {
          "@type": "Place",
          name: "Hardenberg, Overijssel, Netherlands",
        },
        sameAs: [
          "https://nl.linkedin.com/in/kevin-pierik",
          "https://www.instagram.com/kevinpierikk",
        ],
      },
    ],
  };
}

export function breadcrumbStructuredData(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
