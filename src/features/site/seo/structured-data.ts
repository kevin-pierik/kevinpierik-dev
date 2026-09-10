import { siteConfig } from "../config";

export type BreadcrumbItem = {
  name: string;
  url: string;
};

export function profileStructuredData() {
  const personId = `${siteConfig.url}/#person`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${siteConfig.url}/#website`,
        name: siteConfig.name,
        url: siteConfig.url,
        description: siteConfig.description,
        inLanguage: siteConfig.language,
      },
      {
        "@type": "ProfilePage",
        "@id": `${siteConfig.url}/#webpage`,
        url: siteConfig.url,
        name: siteConfig.title,
        description: siteConfig.description,
        inLanguage: siteConfig.language,
        isPartOf: { "@id": `${siteConfig.url}/#website` },
        mainEntity: { "@id": personId },
      },
      {
        "@type": "Person",
        "@id": personId,
        name: siteConfig.name,
        url: siteConfig.url,
        email: siteConfig.email,
        description: siteConfig.description,
        jobTitle: "Frontend Developer",
        homeLocation: {
          "@type": "Place",
          name: "Hardenberg, Overijssel, Netherlands",
        },
        sameAs: siteConfig.social.map((item) => item.href),
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
