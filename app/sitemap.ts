import type { MetadataRoute } from "next";

import { siteConfig } from "@/features/site/config";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteConfig.url,
      changeFrequency: "monthly",
      priority: 1,
      alternates: {
        languages: { [siteConfig.language]: siteConfig.url },
      },
    },
  ];
}
