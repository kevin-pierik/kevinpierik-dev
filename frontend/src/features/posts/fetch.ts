import { notFound } from "next/navigation";
import { cache } from "react";

import { client } from "@/features/sanity/client";

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
  const articles = await client.fetch(ARTICLES_QUERY);
  return articles.map(({ plainText, ...article }) => ({
    ...article,
    readingMinutes: readingMinutes(plainText),
  }));
});

export async function getAllArticles() {
  return client.fetch(ALL_ARTICLES_QUERY);
}

export async function getArticleSlugs() {
  return client.fetch(ARTICLE_SLUGS_QUERY);
}

export const getArticle = cache(async (slug: string) => {
  const article = await client.fetch(ARTICLE_QUERY, { slug });
  if (!article) notFound();

  return {
    ...article,
    readingMinutes: readingMinutes(article.plainText),
  };
});
