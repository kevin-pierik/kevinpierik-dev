import { hasLocale, type Locale } from "./config";

type Translation = { language: string | null; path: string | null } | null;

export function alternatePaths(
  locale: Locale,
  path: string,
  translations: readonly Translation[],
): Partial<Record<Locale, string>> {
  const paths: Partial<Record<Locale, string>> = { [locale]: path };
  for (const translation of translations) {
    if (
      translation?.path &&
      translation.language &&
      hasLocale(translation.language)
    ) {
      paths[translation.language] = translation.path;
    }
  }
  return paths;
}
