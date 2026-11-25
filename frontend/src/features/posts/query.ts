import { defineQuery } from "next-sanity";

import { sectionsFragment } from "../sections/fragment";

const articleFragment = /* groq */ `
  title,
  "slug": slug.current,
  description,
  publishedAt,
  updatedAt
`;

export const ARTICLES_QUERY = defineQuery(`
  *[_type == "article" && showInPosts != false && defined(slug.current)]
    | order(publishedAt desc) {
      ${articleFragment},
      "plainText": pt::text(sections[_type == "textSection"].body[])
    }
`);

export const ALL_ARTICLES_QUERY = defineQuery(`
  *[_type == "article" && defined(slug.current)]
    | order(publishedAt desc) {
      ${articleFragment}
    }
`);

export const ARTICLE_SLUGS_QUERY = defineQuery(`
  *[_type == "article" && defined(slug.current)] {
    "slug": slug.current
  }
`);

export const ARTICLE_QUERY = defineQuery(`
  *[_type == "article" && slug.current == $slug][0] {
    ${articleFragment},
    seo { title, description },
    "plainText": pt::text(sections[_type == "textSection"].body[]),
    ${sectionsFragment}
  }
`);
