export const dynamic = "force-static";

const body = `# Kevin Pierik — Frontend Developer

> Frontend developer focused on clear, useful interfaces in Hardenberg, the Netherlands.

## Canonical page

- [Homepage and curriculum vitae](https://www.kevinpierik.dev): Professional profile, education, software skills, work experience, and contact details.

## Contact

- [Email](mailto:kevinpierik@icloud.com)
- [LinkedIn](https://nl.linkedin.com/in/kevin-pierik)
- [Instagram](https://www.instagram.com/kevinpierikk)
`;

export function GET(): Response {
  return new Response(body, {
    headers: { "content-type": "text/plain; charset=utf-8" },
  });
}
