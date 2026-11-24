import { sectionsToMarkdown } from "@/features/sections/markdown";
import { absoluteUrl } from "@/features/site";
import type { Section } from "@/features/sections/types";

import { postsPath } from "./fetch";

type Article = {
  title: string;
  slug: string;
  description: string;
  publishedAt: string;
  sections: Section[] | null;
};

export function articleMarkdown(article: Article) {
  return [
    `# ${article.title}`,
    `URL: ${absoluteUrl(postsPath(article.slug))}\nPublished: ${article.publishedAt.slice(0, 10)}`,
    article.description && `> ${article.description}`,
    sectionsToMarkdown(article.sections),
  ]
    .filter(Boolean)
    .join("\n\n");
}
