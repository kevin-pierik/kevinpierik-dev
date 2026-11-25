import { getPage, getPageUris } from "@/features/pages/fetch";
import { getArticle, getArticles } from "@/features/posts/fetch";
import { articleMarkdown } from "@/features/posts/markdown";
import { sectionsToMarkdown } from "@/features/sections/markdown";
import { absoluteUrl, llmsHeader } from "@/features/site";

export const dynamic = "force-static";

export async function GET(): Promise<Response> {
  const [pages, articles] = await Promise.all([
    getPageUris().then((uris) => Promise.all(uris.map(getPage))),
    getArticles().then((list) =>
      Promise.all(list.map(({ slug }) => getArticle(slug))),
    ),
  ]);

  const body = [
    llmsHeader,
    ...pages.map((page) =>
      [
        `# ${page.title}`,
        `URL: ${absoluteUrl(page.uri)}`,
        sectionsToMarkdown(page.sections),
      ]
        .filter(Boolean)
        .join("\n\n"),
    ),
    ...articles.map(articleMarkdown),
  ].join("\n\n---\n\n");

  return new Response(`${body}\n`, {
    headers: { "content-type": "text/plain; charset=utf-8" },
  });
}
