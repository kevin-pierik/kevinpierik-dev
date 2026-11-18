import type { MetadataRoute } from "next";

import {
  articleAlternates,
  blogPath,
  blogPaths,
  getAllArticles,
} from "@/features/blog/fetch";
import { languageAlternates, type Locale, locales } from "@/features/i18n";
import { alternatePaths } from "@/features/i18n/alternates";
import { getAllPages } from "@/features/pages/fetch";
import { isHomeUri } from "@/features/pages/uri";
import { siteUrl } from "@/features/site";

function absolute(path: string) {
  return `${siteUrl}${path === "/" ? "" : path}`;
}

function languages(paths: Partial<Record<Locale, string>>) {
  return {
    languages: languageAlternates(
      Object.fromEntries(
        Object.entries(paths).map(([locale, path]) => [locale, absolute(path)]),
      ),
    ),
  };
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
      priority: isHomeUri(page.language, page.uri) ? 1 : 0.8,
      alternates: languages(
        alternatePaths(page.language, page.uri, page.translations),
      ),
    })),
    ...locales.map((locale) => ({
      url: absolute(blogPath(locale)),
      changeFrequency: "weekly" as const,
      priority: 0.7,
      alternates: languages(blogPaths()),
    })),
    ...articles.map((article) => ({
      url: absolute(blogPath(article.language, article.slug)),
      lastModified: article.updatedAt ?? article.publishedAt,
      alternates: languages(
        articleAlternates(article.language, article.slug, article.translations),
      ),
    })),
  ];
}
