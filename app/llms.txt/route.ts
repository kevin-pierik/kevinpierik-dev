import { siteConfig } from "@/features/site/config";

export const dynamic = "force-static";

export async function GET(): Promise<Response> {
  const lines = [
    `# ${siteConfig.name}`,
    "",
    `> ${siteConfig.description}`,
    "",
    "## Pages",
    "",
    `- [Curriculum vitae](${siteConfig.url}): One-page profile, experience, practice and contact details.`,
    "",
    "## Contact",
    "",
    `- [Email](mailto:${siteConfig.email})`,
    ...siteConfig.social.map(
      (item) => `- [${item.label}](${item.href})`,
    ),
  ];

  return new Response(lines.join("\n"), {
    headers: { "content-type": "text/plain; charset=utf-8" },
  });
}
