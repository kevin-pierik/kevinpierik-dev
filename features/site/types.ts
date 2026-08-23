export type SiteLink = {
  label: string;
  href: string;
};

export type Settings = {
  name: string;
  title: string;
  description: string;
  email: string;
  version: string;
  footerNote: string | null;
  social: SiteLink[];
  navigation: SiteLink[];
  cornerLinks: SiteLink[];
};

export type SeoFields = {
  metaTitle: string | null;
  metaDescription: string | null;
  noIndex: boolean;
};
