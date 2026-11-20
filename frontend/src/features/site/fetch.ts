import { cache } from "react";

import { sanityFetch } from "@/features/sanity/live";

import { SETTINGS_QUERY } from "./query";

export const getSettings = cache(async () => {
  const { data } = await sanityFetch({ query: SETTINGS_QUERY, stega: false });
  return data;
});
