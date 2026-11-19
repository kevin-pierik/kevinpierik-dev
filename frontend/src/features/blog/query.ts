import { defineQuery } from "next-sanity";

import { imageFragment } from "../sanity/media/fragment";

const articleFragment = /* groq */ `
  title,
  "slug": slug.current,
  language,
  description,
  publishedAt,
  updatedAt,
  "translations": *[_type == "translation.metadata" && references(^._id)]
    .translations[].value->{ language, "slug": slug.current }
`;

export const ARTICLES_QUERY = defineQuery(`
  *[_type == "article" && language == $language && defined(slug.current)]
    | order(publishedAt desc) {
      ${articleFragment},
      cover { ${imageFragment} }
    }
`);

export const ALL_ARTICLES_QUERY = defineQuery(`
  *[_type == "article" && defined(language) && defined(slug.current)]
    | order(publishedAt desc) {
      ${articleFragment}
    }
`);

export const ARTICLE_SLUGS_QUERY = defineQuery(`
  *[_type == "article" && language == $language && defined(slug.current)] {
    "slug": slug.current
  }
`);

export const ARTICLE_QUERY = defineQuery(`
  *[_type == "article" && language == $language && slug.current == $slug][0] {
    ${articleFragment},
    "plainText": pt::text(body),
    body[] {
      ...,
      _type == "image" => { ${imageFragment}, caption, wide }
    },
    "previous": *[
      _type == "article" && language == ^.language && publishedAt < ^.publishedAt
    ] | order(publishedAt desc)[0] { title, "slug": slug.current },
    "next": *[
      _type == "article" && language == ^.language && publishedAt > ^.publishedAt
    ] | order(publishedAt asc)[0] { title, "slug": slug.current }
  }
`);
