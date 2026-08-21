import { getPosts } from "@/features/blog/resolve";
import { getProjects } from "@/features/desktop/resolve";
import { getSitemapEntries } from "@/features/site/resolve";
import { siteConfig } from "@/features/site/config";
import { getSettings } from "@/features/site/resolve";

export const dynamic = "force-static";

export async function GET(): Promise<Response> {
  const [settings, projects, posts, entries] = await Promise.all([
    getSettings(),
    getProjects(),
    getPosts(),
    getSitemapEntries(),
  ]);

  const lines = [
    `# ${settings.name}`,
    "",
    `> ${settings.description}`,
    "",
    "## Pages",
    "",
    `- [Home](${siteConfig.url}): Landing page of ${settings.name}.`,
    `- [Extra](${siteConfig.url}/extra): Additional work and documents by ${settings.name}.`,
    ...projects.map(
      (project) =>
        `- [${project.title}](${siteConfig.url}/extra/${project.id}): Document by ${settings.name}.`,
    ),
  ];

  for (const page of entries.pages) {
    if (page.slug) {
      lines.push(`- [${page.slug}](${siteConfig.url}/${page.slug})`);
    }
  }

  if (posts.length > 0) {
    lines.push(
      `- [Blog](${siteConfig.url}/blog): Notes and articles by ${settings.name}.`,
      ...posts.map(
        (post) =>
          `- [${post.title}](${siteConfig.url}/blog/${post.slug})${post.excerpt ? `: ${post.excerpt}` : ""}`,
      ),
    );
  }

  lines.push(
    "",
    "## Optional",
    "",
    `- [Sitemap](${siteConfig.url}/sitemap.xml): Every indexable URL on this site.`,
    "",
  );

  return new Response(lines.join("\n"), {
    headers: { "content-type": "text/plain; charset=utf-8" },
  });
}
