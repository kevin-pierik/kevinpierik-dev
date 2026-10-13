import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://www.kevinpierik.dev/",
      changeFrequency: "monthly",
      priority: 1,
      alternates: {
        languages: { en: "https://www.kevinpierik.dev/" },
      },
    },
  ];
}
