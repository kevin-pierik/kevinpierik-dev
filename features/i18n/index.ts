import { notFound } from "next/navigation";
import { lang } from "next/root-params";

import en from "@/features/i18n/dictionaries/en.json";
import nl from "@/features/i18n/dictionaries/nl.json";

const dictionaries = { en, nl } satisfies Record<string, typeof en>;

export type Locale = keyof typeof dictionaries;
export type Dictionary = typeof en;

export const locales = Object.keys(dictionaries) as Locale[];

export const defaultLocale: Locale = "en";

export const prefixedLocales = locales.filter(
  (locale) => locale !== defaultLocale,
);

export const hasLocale = (locale: string): locale is Locale =>
  locale in dictionaries;

export async function getLocale(): Promise<Locale> {
  const locale = (await lang()) ?? defaultLocale;
  if (!hasLocale(locale)) notFound();
  return locale;
}

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}
