# kevinpierik.dev

The source for [kevinpierik.dev](https://www.kevinpierik.dev): a fast, one-page professional profile and curriculum vitae for Kevin Pierik.

## Stack

- Next.js 16 App Router, with every route statically prerendered
- React Server Components; client components only for the interactive BIOS 404, ui-sdk links, and Lenis smooth scrolling
- Tailwind CSS 4, with Geist
- MDX for the CV content
- ESLint, Prettier, and Vitest
- Bun and Vercel

## Project structure

```text
app/          # Routes, metadata routes (robots, sitemap, llms.txt), and the shared HTML shell
components/   # Small, feature-agnostic building blocks
features/     # Site header and footer, i18n dictionaries, BIOS 404, fonts, Lenis, and styles
docs/         # Deployment notes and per-feature documentation
public/       # Icons and the Open Graph image
```

The homepage is `/` in English and `/nl` in Dutch, both from `app/[lang]/`. `layout.tsx` renders the header and footer, `page.tsx` owns the metadata and the `schema-dts`-typed structured data, and the CV content lives in `home.en.mdx` and `home.nl.mdx`, styled through `mdx-components.tsx`. UI strings are in `features/i18n/`. These files repeat the same profile details, so keep them in sync.

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

## License

The source code is available under the [MIT License](LICENSE). The CV content, name, and images are not covered by it and remain all rights reserved. See [CONTRIBUTING.md](CONTRIBUTING.md) to contribute.
