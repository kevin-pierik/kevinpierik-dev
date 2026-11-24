import { postsPath, getAllArticles } from "@/features/posts/fetch";
import { getAllPages } from "@/features/pages/fetch";
import { llmsHeader, siteUrl } from "@/features/site";
import { email, socialLinks } from "@/features/site/social-links";

export const dynamic = "force-static";

function list(
  items: { title: string; path: string; description?: string | null }[],
) {
  return items
    .map(
      ({ title, path, description }) =>
        `- [${title}](${siteUrl}${path === "/" ? "" : path})${description ? `: ${description}` : ""}`,
    )
    .join("\n");
}

export async function GET(): Promise<Response> {
  const [pages, articles] = await Promise.all([
    getAllPages(),
    getAllArticles(),
  ]);
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
  {
    title: "Posts",
    path: postsPath(),
    description:
      "Notes on frontend development, the web, and the work behind it.",
  },
  ...articles.map((article) => ({
    title: article.title,
    path: postsPath(article.slug),
    description: article.description,
  })),
])}

## Contact

- [Email](mailto:${email})
${socialLinks.map(({ label, href }) => `- [${label}](${href})`).join("\n")}
`;

  return new Response(body, {
    headers: { "content-type": "text/plain; charset=utf-8" },
  });
}
