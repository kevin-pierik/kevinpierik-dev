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
  email: string;
  social: SiteLink[];
};
