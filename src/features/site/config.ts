import type { SiteConfig } from "./types";

const fallbackUrl = import.meta.env.PROD
  ? "https://www.kevinpierik.dev"
  : "http://localhost:4321";

const url = (
  import.meta.env.PUBLIC_SITE_URL ||
  fallbackUrl
).replace(/\/+$/, "");

export const siteConfig: SiteConfig = {
  name: "Kevin Pierik",
  title: "Frontend Developer | Kevin Pierik",
  description:
    "Frontend developer focused on clear, useful interfaces in Hardenberg, the Netherlands.",
  url,
  domain: url.replace(/^https?:\/\//, ""),
  version: "v1.0.0",
  language: "en",
  locale: "en_US",
  email: "kevinpierik@icloud.com",
  social: [
    { label: "LinkedIn", href: "https://nl.linkedin.com/in/kevin-pierik" },
    { label: "Instagram", href: "https://www.instagram.com/kevinpierikk" },
  ],
};
