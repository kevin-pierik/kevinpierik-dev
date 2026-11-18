import { notFound } from "next/navigation";
import { cache } from "react";

import { alternatePaths } from "@/features/i18n/alternates";
import { hasLocale, type Locale } from "@/features/i18n/config";
import { sanityFetch } from "@/features/sanity/live";

import { ALL_PAGES_QUERY, PAGE_QUERY, PAGE_URIS_QUERY } from "./query";

export const getPage = cache(async (locale: Locale, uri: string) => {
  const { data: page } = await sanityFetch({
    query: PAGE_QUERY,
    params: { language: locale, uri },
    stega: false,
  });
  if (!page) notFound();

  return {
    ...page,
    alternates: alternatePaths(locale, page.uri, page.translations),
  };
});

export async function getPageUris(locale: Locale) {
  const { data } = await sanityFetch({
    query: PAGE_URIS_QUERY,
    params: { language: locale },
    perspective: "published",
    stega: false,
  });
  return data.map(({ uri }) => uri);
}

export async function getAllPages() {
  const { data } = await sanityFetch({
    query: ALL_PAGES_QUERY,
    perspective: "published",
    stega: false,
  });
  return data.filter(
    (page): page is typeof page & { language: Locale } =>
      page.language !== null && hasLocale(page.language),
  );
}
