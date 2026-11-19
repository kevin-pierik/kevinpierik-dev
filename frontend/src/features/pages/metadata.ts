import type { Metadata } from "next";
import type { Graph } from "schema-dts";

import {
  getDictionary,
  languageAlternates,
  type Locale,
  locales,
  otherOgLocales,
} from "@/features/i18n";
import {
  personId,
  siteName as name,
  siteUrl,
  websiteId,
} from "@/features/site";

type PageSummary = {
  title: string;
  uri: string;
  seo: { title?: string; description?: string } | null;
  alternates: Partial<Record<Locale, string>>;
};

export function pageMetadata(
  locale: Locale,
  page: PageSummary,
  isHome: boolean,
): Metadata {
  const dictionary = getDictionary(locale);
  const title =
    page.seo?.title ?? (isHome ? dictionary.title : `${page.title} | ${name}`);
  const description =
    page.seo?.description ?? (isHome ? dictionary.description : undefined);
  const copyrightYear = new Date().getFullYear();

  return {
    title,
    description,
    applicationName: name,
    authors: [{ name, url: siteUrl }],
    creator: name,
    publisher: name,
    category: "technology",
    alternates: {
      canonical: page.uri,
      languages: languageAlternates(page.alternates),
    },
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
      locale: dictionary.ogLocale,
      alternateLocale: otherOgLocales(
        locale,
        Object.keys(page.alternates) as Locale[],
      ),
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

export function homeStructuredData(locale: Locale): Graph {
  const { path, title, description } = getDictionary(locale);
  const pageUrl = locale === "en" ? `${siteUrl}/` : `${siteUrl}${path}`;
  const copyrightYear = new Date().getFullYear();

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": websiteId,
        name,
        url: siteUrl,
        description,
        inLanguage: locales,
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
        inLanguage: locale,
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
        email: "hello@kevinpierik.dev",
        telephone: "+31615545687",
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
        sameAs: [
          "https://nl.linkedin.com/in/kevin-pierik",
          "https://www.instagram.com/kevinpierikk",
          "https://github.com/kevin-pierik",
        ],
      },
    ],
  };
}
