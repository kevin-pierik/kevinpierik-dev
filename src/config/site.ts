export type SiteLink = {
  label: string;
  href: string;
};

export type SiteConfig = {
  name: string;
  title: string;
  description: string;
  url: string;
  domain: string;
  version: string;
  language: string;
  locale: string;
  social: SiteLink[];
};

const fallbackUrl =
  process.env.NODE_ENV === "production"
    ? "https://kevinpierik.dev"
    : "http://localhost:3000";

const url = (process.env.NEXT_PUBLIC_SITE_URL ?? fallbackUrl).replace(
  /\/+$/,
  "",
);

export const siteConfig: SiteConfig = {
  name: "Kevin Pierik",
  title: "Kevin Pierik",
  description: "Personal site of Kevin Pierik, web developer.",
  url,
  domain: url.replace(/^https?:\/\//, ""),
  version: "v1.0.0",
  language: "en",
  locale: "en_US",
  social: [],
};
