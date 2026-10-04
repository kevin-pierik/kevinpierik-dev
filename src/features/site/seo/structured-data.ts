import { pageTitle, profile } from "../profile";

export type BreadcrumbItem = {
  name: string;
  url: string;
};

export function profileStructuredData() {
  const { address } = profile.contact;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${profile.url}/#website`,
        name: profile.name,
        url: profile.url,
        description: profile.description,
        inLanguage: "en",
      },
      {
        "@type": "ProfilePage",
        "@id": `${profile.url}/#webpage`,
        url: profile.url,
        name: pageTitle,
        description: profile.description,
        inLanguage: "en",
        isPartOf: { "@id": `${profile.url}/#website` },
        mainEntity: { "@id": `${profile.url}/#person` },
      },
      {
        "@type": "Person",
        "@id": `${profile.url}/#person`,
        name: profile.name,
        url: profile.url,
        email: profile.contact.email,
        description: profile.description,
        jobTitle: profile.role,
        homeLocation: {
          "@type": "Place",
          name: `${address.locality}, ${address.region}, ${address.country}`,
        },
        sameAs: profile.social.map(({ href }) => href),
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
