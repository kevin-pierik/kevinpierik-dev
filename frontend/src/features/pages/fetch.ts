import { notFound } from "next/navigation";
import { cache } from "react";

import { postsPath } from "@/features/posts/fetch";
import { client } from "@/features/sanity/client";

import { ALL_PAGES_QUERY, PAGE_QUERY, PAGE_URIS_QUERY } from "./query";

export const getPageIfExists = cache(async (uri: string) => {
  const page = await client.fetch(PAGE_QUERY, { uri });
  if (!page) return null;

  return page;
});

export const getPage = cache(async (uri: string) => {
  const page = await getPageIfExists(uri);
  if (!page) notFound();
  return page;
});

export async function getPageUris() {
  const data = await client.fetch(PAGE_URIS_QUERY);
  return data.map(({ uri }) => uri).filter((uri) => uri !== postsPath());
}

export async function getAllPages() {
  return client.fetch(ALL_PAGES_QUERY);
}
