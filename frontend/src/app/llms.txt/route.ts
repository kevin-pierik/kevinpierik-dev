import { postsPath, getAllArticles } from "@/features/posts/fetch";
import { getAllPages } from "@/features/pages/fetch";
import { siteUrl } from "@/features/site";

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

  const body = `# Kevin Pierik — Frontend Developer

> Frontend developer focused on clear, useful interfaces in Hardenberg, the Netherlands.

## Pages

${list(pages.map((page) => ({ title: page.title, path: page.uri, description: page.seo?.description })))}

## Posts

${list([
  {
    title: "Posts",
    path: postsPath("en"),
    description:
      "Notes on frontend development, the web, and the work behind it.",
  },
  {
    title: "Dutch posts",
    path: postsPath("nl"),
    description: "Posts written in Dutch.",
  },
  ...articles.map((article) => ({
    title: article.title,
    path: postsPath(article.language, article.slug),
    description: article.description,
  })),
])}

## Contact

- [Email](mailto:hello@kevinpierik.dev)
- [LinkedIn](https://nl.linkedin.com/in/kevin-pierik)
- [Instagram](https://www.instagram.com/kevinpierikk)
- [GitHub](https://github.com/kevin-pierik)
`;

  return new Response(body, {
    headers: { "content-type": "text/plain; charset=utf-8" },
  });
}
