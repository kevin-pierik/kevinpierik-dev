import type { Metadata } from "next";
import type { Graph } from "schema-dts";

import {
  personId,
  siteName as name,
  siteUrl,
  websiteId,
} from "@/features/site";
import { email, socialLinks } from "@/features/site/social-links";

type PageSummary = {
  title: string;
  uri: string;
  seo: { title?: string; description?: string } | null;
};

export function pageMetadata(page: PageSummary, isHome: boolean): Metadata {
  const title = page.seo?.title ?? (isHome ? name : `${page.title} | ${name}`);
  const description = page.seo?.description ?? undefined;
  const copyrightYear = new Date().getFullYear();

  return {
    title,
    description,
    applicationName: name,
    authors: [{ name, url: siteUrl }],
    creator: name,
    publisher: name,
    category: "technology",
    alternates: { canonical: page.uri },
    openGraph: {
      ...(isHome
        ? {
            type: "profile",
            firstName: "Kevin",
            lastName: "Pierik",
            username: "kevin-pierik",
          }
        : { type: "website" }),
      url: page.uri,
      siteName: name,
      locale: "en_US",
      title,
      description,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    robots: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
    other: {
      copyright: `© ${copyrightYear} ${name}`,
    },
  };
}

export function homeStructuredData(page: PageSummary): Graph {
  const pageUrl = siteUrl;
  const title = page.seo?.title ?? name;
  const description = page.seo?.description ?? undefined;
  const copyrightYear = new Date().getFullYear();

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": websiteId,
        name,
        alternateName: "kevinpierik.dev",
        url: siteUrl,
        description,
        inLanguage: "en",
        publisher: { "@id": personId },
        copyrightHolder: { "@id": personId },
        copyrightYear,
      },
      {
        "@type": "ProfilePage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: title,
        description,
        inLanguage: "en",
        isPartOf: { "@id": websiteId },
        mainEntity: { "@id": personId },
      },
      {
        "@type": "Person",
        "@id": personId,
        name,
        givenName: "Kevin",
        familyName: "Pierik",
        url: siteUrl,
        mainEntityOfPage: { "@id": `${siteUrl}/#webpage` },
        email,
        description,
        jobTitle: "Frontend Developer",
        hasOccupation: {
          "@type": "Occupation",
          name: "Frontend Developer",
          occupationLocation: { "@type": "Country", name: "Netherlands" },
        },
        address: {
          "@type": "PostalAddress",
          addressLocality: "Hardenberg",
          addressRegion: "Overijssel",
          addressCountry: "NL",
        },
        nationality: { "@type": "Country", name: "Netherlands" },
        knowsLanguage: ["nl", "en"],
        worksFor: {
          "@type": "Organization",
          name: "Friday Digital Agency",
          url: "https://www.friday.nl",
        },
        alumniOf: [
          { "@type": "EducationalOrganization", name: "Deltion College" },
          { "@type": "EducationalOrganization", name: "Vechtdal College" },
        ],
        knowsAbout: ["Next.js", "TypeScript", "Tailwind CSS", "Vercel"],
        sameAs: socialLinks.map(({ href }) => href),
      },
    ],
  };
}
