import type { APIRoute } from "astro";

export const prerender = true;

export const GET: APIRoute = () => {
  const lines = [
    "# Kevin Pierik — Frontend Developer",
    "",
    "> Frontend developer focused on clear, useful interfaces in Hardenberg, the Netherlands.",
    "",
    "## Canonical page",
    "",
    "- [Homepage and curriculum vitae](https://www.kevinpierik.dev): Professional profile, education, software skills, work experience, and contact details.",
    "",
    "## Contact",
    "",
    "- [Email](mailto:kevinpierik@icloud.com)",
    "- [LinkedIn](https://nl.linkedin.com/in/kevin-pierik)",
    "- [Instagram](https://www.instagram.com/kevinpierikk)",
  ];

  return new Response(`${lines.join("\n")}\n`, {
    headers: { "content-type": "text/plain; charset=utf-8" },
  });
};
