import { notFound } from "next/navigation";
import { cache } from "react";

import { getDictionary, type Locale, locales } from "@/features/i18n";
import { alternatePaths } from "@/features/i18n/alternates";
import { hasLocale } from "@/features/i18n/config";
import { sanityFetch } from "@/features/sanity/live";

import {
  ALL_ARTICLES_QUERY,
  ARTICLE_QUERY,
  ARTICLE_SLUGS_QUERY,
  ARTICLES_QUERY,
} from "./query";
import { readingMinutes } from "./reading-time";

type Translations = readonly ({
  language: string | null;
  slug: string | null;
} | null)[];

export function blogPath(locale: Locale, slug?: string) {
  const { blogPath } = getDictionary(locale);
  return slug ? `${blogPath}/${slug}` : blogPath;
}

export function blogPaths(): Record<Locale, string> {
  return Object.fromEntries(
    locales.map((locale) => [locale, blogPath(locale)]),
  ) as Record<Locale, string>;
}

export function articleAlternates(
  locale: Locale,
  slug: string,
  translations: Translations,
) {
  return alternatePaths(
    locale,
    blogPath(locale, slug),
    translations.map((translation) =>
      translation?.slug &&
      translation.language &&
      hasLocale(translation.language)
        ? {
            language: translation.language,
            path: blogPath(translation.language, translation.slug),
          }
        : null,
    ),
  );
}

export async function getArticles(locale: Locale) {
  const { data } = await sanityFetch({
    query: ARTICLES_QUERY,
    params: { language: locale },
    stega: false,
  });
  return data;
}

export async function getAllArticles() {
  const { data } = await sanityFetch({
    query: ALL_ARTICLES_QUERY,
    perspective: "published",
    stega: false,
  });
  return data.filter(
    (article): article is typeof article & { language: Locale } =>
      article.language !== null && hasLocale(article.language),
  );
}

export async function getArticleSlugs(locale: Locale) {
  const { data } = await sanityFetch({
    query: ARTICLE_SLUGS_QUERY,
    params: { language: locale },
    perspective: "published",
    stega: false,
  });
  return data;
}

export const getArticle = cache(async (locale: Locale, slug: string) => {
  const { data: article } = await sanityFetch({
    query: ARTICLE_QUERY,
    params: { language: locale, slug },
    stega: false,
  });
  if (!article) notFound();

  return {
    ...article,
    readingMinutes: readingMinutes(article.plainText),
    alternates: articleAlternates(locale, slug, article.translations),
  };
});
