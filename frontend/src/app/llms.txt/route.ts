import { getArticles, postsPath } from "@/features/posts/fetch";
import { getAllPages } from "@/features/pages/fetch";
import { absoluteUrl, contactPath, llmsHeader, siteUrl } from "@/features/site";
import { email, socialLinks } from "@/features/site/social-links";

export const dynamic = "force-static";

function list(
  items: { title: string; path: string; description?: string | null }[],
) {
  return items
    .map(
      ({ title, path, description }) =>
        `- [${title}](${absoluteUrl(path)})${description ? `: ${description}` : ""}`,
    )
    .join("\n");
}

export async function GET(): Promise<Response> {
  const [allPages, articles] = await Promise.all([
    getAllPages(),
    getArticles(),
  ]);
  const posts = allPages.find((page) => page.uri === postsPath());
  const pages = allPages.filter((page) => page !== posts);
  const body = `${llmsHeader}

The full text of every page and post is in [llms-full.txt](${siteUrl}/llms-full.txt). Each post also has a Markdown version at its URL followed by \`/md\`.

## Pages

${list(
  pages.map((page) => ({
    title: page.title,
    path: page.uri,
    description: page.seo?.description,
  })),
)}

## Posts

${list([
  ...(posts
    ? [
        {
          title: posts.title,
          path: posts.uri,
          description: posts.seo?.description,
        },
      ]
    : []),
  ...articles.map((article) => ({
    title: article.title,
    path: postsPath(article.slug),
    description: article.description,
  })),
])}

## Contact

- [Get in touch](${absoluteUrl(contactPath)}): how to reach me by email, on LinkedIn, or through my other profiles.
- [Email](mailto:${email})
${socialLinks.map(({ label, href }) => `- [${label}](${href})`).join("\n")}
`;

  return new Response(body, {
    headers: { "content-type": "text/plain; charset=utf-8" },
  });
}
