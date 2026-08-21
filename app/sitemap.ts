import type { MetadataRoute } from "next";

import { siteConfig } from "@/features/site/config";
import { getSitemapEntries } from "@/features/site/resolve";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entries = await getSitemapEntries();
  const now = new Date();

  const routes: MetadataRoute.Sitemap = [
    {
      url: siteConfig.url,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${siteConfig.url}/extra`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];

  if (entries.posts.length > 0) {
    routes.push({
      url: `${siteConfig.url}/blog`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    });
  }

  for (const page of entries.pages) {
    if (!page.slug) continue;

    routes.push({
      url: `${siteConfig.url}/${page.slug}`,
      lastModified: new Date(page._updatedAt),
      changeFrequency: "monthly",
      priority: 0.7,
    });
  }

  for (const window of entries.windows) {
    if (!window.slug) continue;

    routes.push({
      url: `${siteConfig.url}/extra/${window.slug}`,
      lastModified: new Date(window._updatedAt),
      changeFrequency: "monthly",
      priority: 0.7,
    });
  }

  for (const post of entries.posts) {
    if (!post.slug) continue;

    routes.push({
      url: `${siteConfig.url}/blog/${post.slug}`,
      lastModified: new Date(post._updatedAt),
      changeFrequency: "monthly",
      priority: 0.6,
    });
  }

  return routes;
}
