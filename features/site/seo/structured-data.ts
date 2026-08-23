import { siteConfig } from "@/features/site/config";

export function personStructuredData() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    jobTitle: "Frontend Developer",
    homeLocation: {
      "@type": "Place",
      name: "Hardenberg, Netherlands",
    },
    ...(siteConfig.social.length > 0
      ? { sameAs: siteConfig.social.map((item) => item.href) }
      : {}),
  };
}
