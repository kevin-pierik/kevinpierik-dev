import type { MetadataRoute } from "next";

import { getAllArticles, postsPath } from "@/features/posts/fetch";
import { getAllPages } from "@/features/pages/fetch";
import { isHomeUri } from "@/features/pages/uri";
import { siteUrl } from "@/features/site";

function absolute(path: string) {
  return `${siteUrl}${path === "/" ? "" : path}`;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [pages, articles] = await Promise.all([
    getAllPages(),
    getAllArticles(),
  ]);
  return [
    ...pages.map((page) => ({
      url: absolute(page.uri),
      lastModified: page._updatedAt,
      priority: isHomeUri(page.uri) ? 1 : 0.8,
    })),
    {
      url: absolute(postsPath()),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    },
    ...articles.map((article) => ({
      url: absolute(postsPath(article.slug)),
      lastModified: article.updatedAt ?? article.publishedAt,
    })),
  ];
}
