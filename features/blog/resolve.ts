import "server-only";

import { cache } from "react";

import { isSanityConfigured } from "@/env";
import {
  POST_QUERY,
  POST_SLUGS_QUERY,
  POSTS_QUERY,
} from "@/features/blog/query";
import type { Post, PostSummary } from "@/features/blog/types";
import { sanityFetch } from "@/features/sanity/live";
import {
  type Nullable,
  type RawSeo,
  text,
  toSeo,
} from "@/features/sanity/normalise";
import type { PortableTextValue } from "@/features/rich-text/types";

type RawPost = {
  _id: string;
  title?: Nullable;
  slug?: Nullable;
  excerpt?: Nullable;
  publishedAt?: Nullable;
  body?: PortableTextValue;
  seo?: RawSeo;
};

function toPost(post: RawPost): Post | null {
  const slug = text(post.slug);
  const title = text(post.title);
  if (!slug || !title) return null;

  return {
    id: post._id,
    slug,
    title,
    excerpt: text(post.excerpt) ?? "",
    publishedAt: text(post.publishedAt) ?? "",
    body: post.body ?? [],
    seo: toSeo(post.seo),
  };
}

export async function getPosts(): Promise<PostSummary[]> {
  if (!isSanityConfigured) return [];

  const { data } = await sanityFetch({ query: POSTS_QUERY });
  return data.flatMap((post) => toPost(post) ?? []);
}

export const getPost = cache(async (slug: string): Promise<Post | null> => {
  if (!isSanityConfigured) return null;

  const { data } = await sanityFetch({ query: POST_QUERY, params: { slug } });
  return data ? toPost(data) : null;
});

export async function getPostSlugs() {
  if (!isSanityConfigured) return [];

  const { data } = await sanityFetch({
    query: POST_SLUGS_QUERY,
    perspective: "published",
    stega: false,
  });

  return data.flatMap((entry) => (entry.slug ? [{ slug: entry.slug }] : []));
}
