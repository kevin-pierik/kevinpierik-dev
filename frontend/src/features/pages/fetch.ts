import { notFound } from "next/navigation";
import { cache } from "react";

import { postsPath } from "@/features/posts/fetch";
import { sanityFetch } from "@/features/sanity/live";

import { ALL_PAGES_QUERY, PAGE_QUERY, PAGE_URIS_QUERY } from "./query";

export const getPageIfExists = cache(async (uri: string) => {
  const { data: page } = await sanityFetch({
    query: PAGE_QUERY,
    params: { uri },
    stega: false,
  });
  if (!page) return null;

  return page;
});

export const getPage = cache(async (uri: string) => {
  const page = await getPageIfExists(uri);
  if (!page) notFound();
  return page;
});

export async function getPageUris() {
  const { data } = await sanityFetch({
    query: PAGE_URIS_QUERY,
    perspective: "published",
    stega: false,
  });
  return data.map(({ uri }) => uri).filter((uri) => uri !== postsPath());
}

export async function getAllPages() {
  const { data } = await sanityFetch({
    query: ALL_PAGES_QUERY,
    perspective: "published",
    stega: false,
  });
  return data;
}
