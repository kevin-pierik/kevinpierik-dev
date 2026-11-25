import { getArticles, postsPath } from "@/features/posts/fetch";
import { escapeXml } from "@/features/posts/escape-xml";
import { getPage } from "@/features/pages/fetch";
import { siteName, siteUrl } from "@/features/site";
import { email } from "@/features/site/social-links";

export const dynamic = "force-static";

export async function GET(): Promise<Response> {
  const [page, articles] = await Promise.all([
    getPage(postsPath()),
    getArticles(),
  ]);
  const title = page.seo?.title ?? page.title;
  const description = page.seo?.description ?? "";

  const items = articles
    .map((article) => {
      const url = escapeXml(`${siteUrl}${postsPath(article.slug)}`);
      return `    <item>
      <title>${escapeXml(article.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <description>${escapeXml(article.description)}</description>
      <pubDate>${new Date(article.publishedAt).toUTCString()}</pubDate>
      <dc:language>en</dc:language>
    </item>`;
    })
    .join("\n");

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/">
  <channel>
    <title>${escapeXml(title)}</title>
    <link>${siteUrl}${postsPath()}</link>
    <description>${escapeXml(description)}</description>
    <language>en</language>
    <managingEditor>${email} (${siteName})</managingEditor>
    <atom:link href="${siteUrl}/feed.xml" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>
`;

  return new Response(body, {
    headers: { "content-type": "application/rss+xml; charset=utf-8" },
  });
}
