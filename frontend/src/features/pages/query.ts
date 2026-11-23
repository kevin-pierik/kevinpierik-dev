import { defineQuery } from "next-sanity";

import { sectionsFragment } from "../sections/fragment";

export const PAGE_QUERY = defineQuery(`
  *[_type == "page" && uri.current == $uri][0] {
    title,
    "uri": uri.current,
    seo,
    ${sectionsFragment}
  }
`);

export const PAGE_URIS_QUERY = defineQuery(`
  *[_type == "page" && defined(uri.current)] {
    "uri": uri.current
  }
`);

export const ALL_PAGES_QUERY = defineQuery(`
  *[_type == "page" && defined(uri.current)]
    | order(uri.current asc) {
      title,
      "uri": uri.current,
      seo,
      _updatedAt
    }
`);
