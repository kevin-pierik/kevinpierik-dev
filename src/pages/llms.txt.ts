import type { APIRoute } from "astro";

import { siteConfig } from "../features/site/config";

export const prerender = true;

export const GET: APIRoute = () => {
  const lines = [
    `# ${siteConfig.name} — Frontend Developer`,
    "",
    `> ${siteConfig.description}`,
    "",
    "## Canonical page",
    "",
    `- [Homepage and curriculum vitae](${siteConfig.url}): Professional profile, education, software skills, work experience, and contact details.`,
    "",
    "## Contact",
    "",
    `- [Email](mailto:${siteConfig.email})`,
    ...siteConfig.social.map((item) => `- [${item.label}](${item.href})`),
  ];

  return new Response(`${lines.join("\n")}\n`, {
    headers: { "content-type": "text/plain; charset=utf-8" },
  });
};
