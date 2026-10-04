import type { APIRoute } from "astro";

import { emailHref, profile } from "../features/site/profile";

export const prerender = true;

export const GET: APIRoute = () => {
  const lines = [
    `# ${profile.name} — ${profile.role}`,
    "",
    `> ${profile.description}`,
    "",
    "## Canonical page",
    "",
    `- [Homepage and curriculum vitae](${profile.url}): Professional profile, education, software skills, work experience, and contact details.`,
    "",
    "## Contact",
    "",
    `- [Email](${emailHref})`,
    ...profile.social.map(({ label, href }) => `- [${label}](${href})`),
  ];

  return new Response(`${lines.join("\n")}\n`, {
    headers: { "content-type": "text/plain; charset=utf-8" },
  });
};
