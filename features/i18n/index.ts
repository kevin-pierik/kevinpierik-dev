import { notFound } from "next/navigation";
import { locale as localeParam } from "next/root-params";

import en from "@/features/i18n/dictionaries/en.json";
import nl from "@/features/i18n/dictionaries/nl.json";

import { hasLocale, type Locale, locales } from "./config";

export { defaultLocale, hasLocale, type Locale, locales } from "./config";

const dictionaries = { en, nl } satisfies Record<Locale, typeof en>;

export type Dictionary = typeof en;

export async function getLocale(): Promise<Locale> {
  const locale = await localeParam();
  if (!locale || !hasLocale(locale)) notFound();
  return locale;
}

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}

export function languageAlternates(
  paths: Partial<Record<Locale, string>>,
  base = "",
) {
  const urls = Object.fromEntries(
    Object.entries(paths).map(([locale, path]) => [locale, `${base}${path}`]),
  );
  return urls.en ? { ...urls, "x-default": urls.en } : urls;
}

export function otherOgLocales(
  locale: Locale,
  available: readonly Locale[] = locales,
) {
  return available
    .filter((other) => other !== locale)
    .map((other) => getDictionary(other).ogLocale);
}
