import { defineQuery } from "next-sanity";

export const PAGE_QUERY = defineQuery(`
  *[_type == "page" && language == $language && uri.current == $uri][0] {
    title,
    "uri": uri.current,
    language,
    seo,
    sections,
    "translations": *[_type == "translation.metadata" && references(^._id)]
      .translations[].value->{ language, "path": uri.current }
  }
`);

export const PAGE_URIS_QUERY = defineQuery(`
  *[_type == "page" && language == $language && defined(uri.current)] {
    "uri": uri.current
  }
`);

export const ALL_PAGES_QUERY = defineQuery(`
  *[_type == "page" && defined(language) && defined(uri.current)]
    | order(uri.current asc) {
      title,
      "uri": uri.current,
      language,
      seo,
      _updatedAt,
      "translations": *[_type == "translation.metadata" && references(^._id)]
        .translations[].value->{ language, "path": uri.current }
    }
`);
