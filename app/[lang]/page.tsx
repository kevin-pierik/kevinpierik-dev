import type { Metadata } from "next";
import type { Graph } from "schema-dts";

import { JsonLd } from "@/components/json-ld";
import {
  getDictionary,
  getLocale,
  type Locale,
  locales,
} from "@/features/i18n";

import EnglishContent from "./home.en.mdx";
import DutchContent from "./home.nl.mdx";

const content = { en: EnglishContent, nl: DutchContent };

const name = "Kevin Pierik";
const siteUrl = "https://www.kevinpierik.dev";

function homeMetadata(locale: Locale): Metadata {
  const { path, ogLocale, title, description } = getDictionary(locale);
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
      canonical: path,
      languages: {
        en: getDictionary("en").path,
        nl: getDictionary("nl").path,
        "x-default": getDictionary("en").path,
      },
    },
    openGraph: {
      type: "profile",
      firstName: "Kevin",
      lastName: "Pierik",
      username: "kevin-pierik",
      url: path,
      siteName: name,
      locale: ogLocale,
      alternateLocale: locales
        .filter((other) => other !== locale)
        .map((other) => getDictionary(other).ogLocale),
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

function homeStructuredData(locale: Locale): Graph {
  const { path, title, description } = getDictionary(locale);
  const pageUrl = locale === "en" ? `${siteUrl}/` : `${siteUrl}${path}`;
  const copyrightYear = new Date().getFullYear();

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        name,
        url: siteUrl,
        description,
        inLanguage: locales,
        publisher: { "@id": `${siteUrl}/#person` },
        copyrightHolder: { "@id": `${siteUrl}/#person` },
        copyrightYear,
      },
      {
        "@type": "ProfilePage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: title,
        description,
        inLanguage: locale,
        isPartOf: { "@id": `${siteUrl}/#website` },
        mainEntity: { "@id": `${siteUrl}/#person` },
      },
      {
        "@type": "Person",
        "@id": `${siteUrl}/#person`,
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

export async function generateMetadata(): Promise<Metadata> {
  return homeMetadata(await getLocale());
}

export default async function Home() {
  const locale = await getLocale();
  const Content = content[locale];

  return (
    <>
      <JsonLd data={homeStructuredData(locale)} />
      <main aria-labelledby="page-title" className="pt-[6lh]" id="main">
        <Content />
      </main>
    </>
  );
}
