import type { MetadataRoute } from "next";

const languages = {
  en: "https://www.kevinpierik.dev",
  nl: "https://www.kevinpierik.dev/nl",
  "x-default": "https://www.kevinpierik.dev",
};

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: languages.en,
      changeFrequency: "monthly",
      priority: 1,
      alternates: { languages },
    },
    {
      url: languages.nl,
      changeFrequency: "monthly",
      priority: 0.9,
      alternates: { languages },
    },
  ];
}
