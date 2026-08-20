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
    `- [Extra](${siteConfig.url}/works): Additional work and documents by ${siteConfig.name}.`,
    `- [Curriculum Vitae](${siteConfig.url}/works/curriculum-vitae): Experience, education, and skills of ${siteConfig.name}.`,
    "",
    "## Optional",
    "",
    `- [Sitemap](${siteConfig.url}/sitemap.xml): Every indexable URL on this site.`,
    "",
  ].join("\n");

  return new Response(body, {
    headers: { "content-type": "text/plain; charset=utf-8" },
  });
}
