import { siteConfig } from "@/features/site/config";
import type { Settings } from "@/features/site/types";

export function personStructuredData(settings: Settings) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: settings.name,
    url: siteConfig.url,
    description: settings.description,
    ...(settings.social.length > 0
      ? { sameAs: settings.social.map((item) => item.href) }
      : {}),
  };
}

export function serialiseJsonLd(data: unknown) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
