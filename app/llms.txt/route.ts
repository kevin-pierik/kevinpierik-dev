export const dynamic = "force-static";

const body = `# Kevin Pierik — Frontend Developer

> Frontend developer focused on clear, useful interfaces in Hardenberg, the Netherlands.

## Canonical pages

- [Homepage and curriculum vitae](https://www.kevinpierik.dev): Professional profile, education, software skills, work experience, and contact details.
- [Dutch version](https://www.kevinpierik.dev/nl): The same profile and curriculum vitae in Dutch.

## Contact

- [Email](mailto:hello@kevinpierik.dev)
- [LinkedIn](https://nl.linkedin.com/in/kevin-pierik)
- [Instagram](https://www.instagram.com/kevinpierikk)
- [GitHub](https://github.com/kevin-pierik)
`;

export function GET(): Response {
  return new Response(body, {
    headers: { "content-type": "text/plain; charset=utf-8" },
  });
}
