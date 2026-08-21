import { defineQuery } from "next-sanity";

export const settingsFields = /* groq */ `
  name,
  title,
  description,
  email,
  version,
  footerNote,
  social[]{ label, href },
  navigation[]{ label, href }
`;

export const SETTINGS_QUERY = defineQuery(`
  *[_type == "settings" && _id == "siteSettings"][0]{ ${settingsFields} }
`);

export const SITEMAP_QUERY = defineQuery(`{
  "pages": *[_type == "desktopWindow" && placement == "standalone"
    && defined(slug.current) && seo.noIndex != true]{ "slug": slug.current, _updatedAt },
  "windows": *[_type == "desktopWindow" && placement == "project"
    && defined(slug.current) && seo.noIndex != true]{ "slug": slug.current, _updatedAt },
  "posts": *[_type == "post" && defined(slug.current) && seo.noIndex != true]{
    "slug": slug.current,
    _updatedAt
  }
}`);
