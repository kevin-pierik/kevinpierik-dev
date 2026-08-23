import { defineQuery } from "next-sanity";

import { settingsFields } from "@/features/site/query";

const windowFields = /* groq */ `
  _id,
  label,
  title,
  "slug": slug.current,
  placement,
  order,
  seo
`;

const documentFields = /* groq */ `
  ${windowFields},
  "body": coalesce(body, text),
  details[]{ label, value },
  cover{ alt, asset },
  "file": file.asset->{ url, originalFilename }
`;

export const SHELL_QUERY = defineQuery(`
  *[_type == "settings" && _id == "siteSettings"][0]{ ${settingsFields} }
`);

export const HOME_WINDOWS_QUERY = defineQuery(`
  *[_type == "desktopWindow" && placement == "home"] | order(order asc, label asc){
    ${windowFields},
    "body": coalesce(body, text)
  }
`);

export const PROJECT_WINDOWS_QUERY = defineQuery(`
  *[_type == "desktopWindow" && placement == "project" && defined(slug.current)]
    | order(order asc, label asc){ ${windowFields}, cover{ alt, asset } }
`);

export const PROJECT_WINDOW_QUERY = defineQuery(`
  *[_type == "desktopWindow" && placement == "project" && slug.current == $slug][0]{
    ${documentFields}
  }
`);

export const STANDALONE_WINDOW_QUERY = defineQuery(`
  *[_type == "desktopWindow" && placement == "standalone" && slug.current == $slug][0]{
    ${documentFields}
  }
`);

export const STANDALONE_SLUGS_QUERY = defineQuery(`
  *[_type == "desktopWindow" && placement == "standalone" && defined(slug.current)]{
    "slug": slug.current
  }
`);

export const PROJECT_SLUGS_QUERY = defineQuery(`
  *[_type == "desktopWindow" && placement == "project" && defined(slug.current)]{
    "slug": slug.current
  }
`);
