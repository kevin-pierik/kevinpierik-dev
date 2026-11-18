const dateLocales: Record<string, string> = { en: "en-GB", nl: "nl-NL" };

export function formatDate(locale: string, iso: string) {
  return new Intl.DateTimeFormat(dateLocales[locale] ?? locale, {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(iso));
}
