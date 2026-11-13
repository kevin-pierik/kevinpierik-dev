import type { Metadata } from "next";
import type { Graph } from "schema-dts";

import { JsonLd } from "@/components/json-ld";
import { SiteFooter } from "@/features/site/site-footer";
import { SiteHeader } from "@/features/site/site-header";

import HomeContent from "./home.mdx";

const name = "Kevin Pierik";
const title = `${name} | Frontend Developer`;
const description =
  "Frontend developer focused on clear, useful interfaces in Hardenberg, the Netherlands.";

const siteUrl = "https://www.kevinpierik.dev";
const copyrightYear = new Date().getFullYear();

export const metadata: Metadata = {
  title,
  description,
  applicationName: name,
  authors: [{ name, url: siteUrl }],
  creator: name,
  publisher: name,
  category: "technology",
  alternates: {
    canonical: "/",
    languages: { en: "/" },
  },
  openGraph: {
    type: "profile",
    firstName: "Kevin",
    lastName: "Pierik",
    username: "kevin-pierik",
    url: "/",
    siteName: name,
    locale: "en_US",
    title,
    description,
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Kevin Pierik — Frontend Developer in Hardenberg, NL",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/og.png"],
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

const structuredData: Graph = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      name,
      url: siteUrl,
      description,
      inLanguage: "en",
      publisher: { "@id": `${siteUrl}/#person` },
      copyrightHolder: { "@id": `${siteUrl}/#person` },
      copyrightYear,
    },
    {
      "@type": "ProfilePage",
      "@id": `${siteUrl}/#webpage`,
      url: siteUrl,
      name: title,
      description,
      inLanguage: "en",
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
      email: "kevinpierik@icloud.com",
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

export default function Home() {
  return (
    <>
      <JsonLd data={structuredData} />
      <SiteHeader />
      <main
        aria-labelledby="page-title"
        className="mx-auto w-full max-w-[50rem] px-6 pt-[6lh]"
        id="main"
      >
        <HomeContent />
      </main>
      <SiteFooter />
    </>
  );
}
