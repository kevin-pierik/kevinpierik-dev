import type { Metadata } from "next";
import type { Graph } from "schema-dts";

import { JsonLd } from "@/components/json-ld";
import { linkClassName as link } from "@/mdx-components";

import Cv from "./cv.mdx";

const title = "Frontend Developer | Kevin Pierik";
const description =
  "Frontend developer focused on clear, useful interfaces in Hardenberg, the Netherlands.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/",
    languages: { en: "/" },
  },
  openGraph: {
    type: "profile",
    url: "/",
    siteName: "Kevin Pierik",
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
};

const siteUrl = "https://www.kevinpierik.dev";

const structuredData: Graph = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      name: "Kevin Pierik",
      url: siteUrl,
      description,
      inLanguage: "en",
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
      name: "Kevin Pierik",
      url: siteUrl,
      email: "kevinpierik@icloud.com",
      description,
      jobTitle: "Frontend Developer",
      homeLocation: {
        "@type": "Place",
        name: "Hardenberg, Overijssel, The Netherlands",
      },
      worksFor: {
        "@type": "Organization",
        name: "Friday Digital Agency",
      },
      alumniOf: [
        { "@type": "EducationalOrganization", name: "Deltion College" },
        { "@type": "EducationalOrganization", name: "Vechtdal College" },
      ],
      knowsAbout: ["Next.js", "TypeScript", "Tailwind CSS", "Vercel"],
      sameAs: [
        "https://nl.linkedin.com/in/kevin-pierik",
        "https://www.instagram.com/kevinpierikk",
      ],
    },
  ],
};

export default function Home() {
  return (
    <>
      <JsonLd data={structuredData} />
      <main
        aria-labelledby="page-title"
        className="flex h-svh flex-col overflow-y-auto overscroll-none bg-black px-3 py-3 text-[0.75rem]/[1.32] font-bold text-white sm:px-[1.35vw] sm:py-[1.35vw]"
        id="main"
      >
        <header className="grid grid-cols-2 gap-x-[4vw] gap-y-[1.35em] sm:grid-cols-[2fr_3fr_3fr_4fr] sm:gap-x-[1vw] sm:gap-y-0">
          <p>
            Kevin Pierik
            <br />
            Frontend Developer
          </p>
          <nav aria-label="Social profiles" className="sm:col-start-4">
            <ul>
              <li>
                <a
                  className={link}
                  href="https://nl.linkedin.com/in/kevin-pierik"
                >
                  LinkedIn
                </a>
              </li>
              <li>
                <a
                  className={link}
                  href="https://www.instagram.com/kevinpierikk"
                >
                  Instagram
                </a>
              </li>
            </ul>
          </nav>
        </header>
        <h1
          className="mt-auto ml-[-0.088em] text-[14vw]/[0.78] font-bold tracking-[-0.02em]"
          id="page-title"
        >
          Kevin Pierik
        </h1>
        <div className="mt-[7.8vh] grid grid-cols-2 gap-x-[4vw] gap-y-[1.35em] sm:grid-cols-[2fr_3fr_3fr_4fr] sm:gap-x-[1vw] sm:gap-y-0">
          <Cv />
        </div>
      </main>
    </>
  );
}
