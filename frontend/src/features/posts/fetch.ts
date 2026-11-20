import { notFound } from "next/navigation";
import { cache } from "react";

import { sanityFetch } from "@/features/sanity/live";

import {
  ALL_ARTICLES_QUERY,
  ARTICLE_QUERY,
  ARTICLE_SLUGS_QUERY,
  ARTICLES_QUERY,
} from "./query";
import { readingMinutes } from "./reading-time";

export function postsPath(slug?: string) {
  return slug ? `/posts/${slug}` : "/posts";
}

export const getArticles = cache(async () => {
  const { data } = await sanityFetch({
    query: ARTICLES_QUERY,
    stega: false,
  });
  return data;
});

export async function getAllArticles() {
  const { data } = await sanityFetch({
    query: ALL_ARTICLES_QUERY,
    perspective: "published",
    stega: false,
  });
  return data;
}

export async function getArticleSlugs() {
  const { data } = await sanityFetch({
    query: ARTICLE_SLUGS_QUERY,
    perspective: "published",
    stega: false,
  });
  return data;
}

export const getArticle = cache(async (slug: string) => {
  const { data: article } = await sanityFetch({
    query: ARTICLE_QUERY,
    params: { slug },
    stega: false,
  });
  if (!article) notFound();

  return {
    ...article,
    readingMinutes: readingMinutes(article.plainText),
  };
});
