# kevinpierik.dev

The source for [kevinpierik.dev](https://www.kevinpierik.dev): a fast, one-page professional profile and curriculum vitae for Kevin Pierik.

## Stack

- Next.js 16 App Router, with every route statically prerendered
- React Server Components; a client component only for the interactive BIOS 404
- Tailwind CSS 4
- ESLint, Prettier, and Vitest
- Bun and Vercel

## Project structure

```text
app/          # Routes, metadata routes (robots, sitemap, llms.txt), and the shared HTML shell
components/   # Small, feature-agnostic building blocks
features/     # BIOS 404, structured data, fonts, and styles
public/       # Icons and the Open Graph image
```

The homepage is a hardcoded placeholder in `app/(web)/page.tsx`. Its metadata, the structured data in `features/seo/structured-data.ts`, and `llms.txt` repeat the same profile details, so keep them in sync.

## Development

```bash
bun install
bun run dev
```

The site is available at [http://localhost:3000](http://localhost:3000). No environment variables are required.

Format the code and run the full quality check before committing:

```bash
bun run format
bun run qa
```

`bun run qa` checks formatting, lints, type-checks, runs the Vitest suite, and builds the production deployment. Use `bun run test:watch` while working on tests.
