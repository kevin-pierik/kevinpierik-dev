import type { SiteLink } from "@/features/site/types";

export type { SiteLink };

export type SiteConfig = {
  name: string;
  title: string;
  description: string;
  url: string;
  domain: string;
  version: string;
  language: string;
  locale: string;
  email: string;
  social: SiteLink[];
  navigation: SiteLink[];
};

const fallbackUrl =
  process.env.NODE_ENV === "production"
    ? "https://www.kevinpierik.dev"
    : "http://localhost:3000";

const url = (process.env.NEXT_PUBLIC_SITE_URL ?? fallbackUrl).replace(
  /\/+$/,
  "",
);

export const siteConfig: SiteConfig = {
  name: "Kevin Pierik",
  title: "Frontend Developer | Kevin Pierik",
  description: "Frontend Developer and student in Hardenberg",
  url,
  domain: url.replace(/^https?:\/\//, ""),
  version: "v1.0.0",
  language: "en",
  locale: "en_US",
  email: "kevinpierik@icloud.com",
  social: [
    { label: "LinkedIn", href: "https://nl.linkedin.com/in/kevin-pierik" },
  ],
  navigation: [
    { label: "Works", href: "/works" },
    { label: "Words", href: "/words" },
    { label: "About", href: "/about" },
  ],
};
