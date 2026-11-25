import type { MetadataRoute } from "next";

import { getAllArticles, postsPath } from "@/features/posts/fetch";
import { getAllPages } from "@/features/pages/fetch";
import { isHomeUri } from "@/features/pages/uri";
import { absoluteUrl, contactPath } from "@/features/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [pages, articles] = await Promise.all([
    getAllPages(),
    getAllArticles(),
  ]);
  const latestPost = Math.max(
    ...articles.map((article) =>
      Date.parse(article.updatedAt ?? article.publishedAt),
    ),
  );
  return [
    ...pages.map((page) => ({
      url: absoluteUrl(page.uri),
      lastModified:
        page.uri === postsPath()
          ? new Date(Math.max(Date.parse(page._updatedAt), latestPost))
          : page._updatedAt,
      priority: isHomeUri(page.uri) ? 1 : 0.8,
    })),
    { url: absoluteUrl(contactPath), priority: 0.8 },
    ...articles.map((article) => ({
      url: absoluteUrl(postsPath(article.slug)),
      lastModified: article.updatedAt ?? article.publishedAt,
    })),
  ];
}
