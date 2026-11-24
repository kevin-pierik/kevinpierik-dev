import type { MetadataRoute } from "next";

import { getAllArticles, postsPath } from "@/features/posts/fetch";
import { getAllPages } from "@/features/pages/fetch";
import { isHomeUri } from "@/features/pages/uri";
import { absoluteUrl } from "@/features/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [pages, articles] = await Promise.all([
    getAllPages(),
    getAllArticles(),
  ]);
  return [
    ...pages.map((page) => ({
      url: absoluteUrl(page.uri),
      lastModified: page._updatedAt,
      priority: isHomeUri(page.uri) ? 1 : 0.8,
    })),
    ...articles.map((article) => ({
      url: absoluteUrl(postsPath(article.slug)),
      lastModified: article.updatedAt ?? article.publishedAt,
    })),
  ];
}
