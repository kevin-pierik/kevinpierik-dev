import "server-only";

import { cache } from "react";

import { isSanityConfigured } from "@/env";
import { sanityFetch } from "@/features/sanity/live";
import { text, toLinks } from "@/features/sanity/normalise";
import { siteConfig } from "@/features/site/config";
import { SETTINGS_QUERY, SITEMAP_QUERY } from "@/features/site/query";
import type { Settings } from "@/features/site/types";

export const settingsDefaults: Settings = {
  name: siteConfig.name,
  title: siteConfig.title,
  description: siteConfig.description,
  email: siteConfig.email,
  version: siteConfig.version,
  footerNote: null,
  social: siteConfig.social,
  navigation: siteConfig.navigation,
};

type RawSettings = {
  name?: string | null;
  title?: string | null;
  description?: string | null;
  email?: string | null;
  version?: string | null;
  footerNote?: string | null;
  social?: { label?: string | null; href?: string | null }[] | null;
  navigation?: { label?: string | null; href?: string | null }[] | null;
} | null;

export function toSettings(data: RawSettings): Settings {
  if (!data) return settingsDefaults;

  return {
    name: text(data.name) ?? settingsDefaults.name,
    title: text(data.title) ?? settingsDefaults.title,
    description: text(data.description) ?? settingsDefaults.description,
    email: text(data.email) ?? settingsDefaults.email,
    version: text(data.version) ?? settingsDefaults.version,
    footerNote: text(data.footerNote),
    social: toLinks(data.social, settingsDefaults.social),
    navigation: toLinks(data.navigation, settingsDefaults.navigation),
  };
}

export const getSettings = cache(async (): Promise<Settings> => {
  if (!isSanityConfigured) return settingsDefaults;

  const { data } = await sanityFetch({ query: SETTINGS_QUERY, stega: false });
  return toSettings(data);
});

export async function getSitemapEntries() {
  if (!isSanityConfigured) return { pages: [], windows: [], posts: [] };

  const { data } = await sanityFetch({ query: SITEMAP_QUERY, stega: false });
  return data;
}
