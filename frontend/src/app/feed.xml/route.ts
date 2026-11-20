import { postsPath, getAllArticles } from "@/features/posts/fetch";
import { getDictionary } from "@/features/i18n";
import { siteName, siteUrl } from "@/features/site";

export const dynamic = "force-static";

function escapeXml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET(): Promise<Response> {
  const articles = await getAllArticles();
  const { postsTitle, postsDescription } = getDictionary("en");

  const items = articles
    .map((article) => {
      const url = `${siteUrl}${postsPath(article.language, article.slug)}`;
      return `    <item>
      <title>${escapeXml(article.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <description>${escapeXml(article.description)}</description>
      <pubDate>${new Date(article.publishedAt).toUTCString()}</pubDate>
      <dc:language>${article.language}</dc:language>
    </item>`;
    })
    .join("\n");

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/">
  <channel>
    <title>${escapeXml(postsTitle)}</title>
    <link>${siteUrl}${postsPath("en")}</link>
    <description>${escapeXml(postsDescription)}</description>
    <language>en</language>
    <managingEditor>hello@kevinpierik.dev (${siteName})</managingEditor>
    <atom:link href="${siteUrl}/feed.xml" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>
`;

  return new Response(body, {
    headers: { "content-type": "application/rss+xml; charset=utf-8" },
  });
}
