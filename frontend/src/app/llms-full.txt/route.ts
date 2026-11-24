import { getPage, getPageUris } from "@/features/pages/fetch";
import { getAllArticles, getArticle } from "@/features/posts/fetch";
import { articleMarkdown } from "@/features/posts/markdown";
import { absoluteUrl, sectionsToMarkdown } from "@/features/sections/markdown";
import { llmsHeader } from "@/features/site";

export const dynamic = "force-static";

export async function GET(): Promise<Response> {
  const [pages, articles] = await Promise.all([
    getPageUris().then((uris) => Promise.all(uris.map(getPage))),
    getAllArticles().then((list) =>
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
