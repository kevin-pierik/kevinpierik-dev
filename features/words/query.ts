import { defineQuery } from "next-sanity";

const postFields = /* groq */ `
  _id,
  title,
  "slug": slug.current,
  excerpt,
  publishedAt
`;

export const POSTS_QUERY = defineQuery(`
  *[_type == "post" && defined(slug.current)] | order(publishedAt desc){ ${postFields} }
`);

export const POST_QUERY = defineQuery(`
  *[_type == "post" && slug.current == $slug][0]{
    ${postFields},
    body,
    seo
  }
`);

export const POST_SLUGS_QUERY = defineQuery(`
  *[_type == "post" && defined(slug.current)]{ "slug": slug.current }
`);
