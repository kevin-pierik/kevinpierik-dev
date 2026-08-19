import { siteConfig } from "@/config/site";

export const dynamic = "force-static";

export function GET(): Response {
  const body = [
    `# ${siteConfig.name}`,
    "",
    `> ${siteConfig.description}`,
    "",
    "## Pages",
    "",
    `- [Home](${siteConfig.url}): Landing page of ${siteConfig.name}.`,
    "",
    "## Optional",
    "",
    ...siteConfig.legal.map(
      (item) => `- [${item.label}](${siteConfig.url}${item.href}): ${item.label} for this site.`,
    ),
    `- [Sitemap](${siteConfig.url}/sitemap.xml): Every indexable URL on this site.`,
    "",
  ].join("\n");

  return new Response(body, {
    headers: { "content-type": "text/plain; charset=utf-8" },
  });
}
