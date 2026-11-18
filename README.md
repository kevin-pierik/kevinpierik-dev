# kevinpierik.dev

The source for [kevinpierik.dev](https://www.kevinpierik.dev): a fast professional profile, curriculum vitae, and blog for Kevin Pierik.

## Stack

- Next.js 16 App Router, with every route statically prerendered
- React Server Components; client components only for ui-sdk links and Lenis smooth scrolling
- Tailwind CSS 4, with Geist Sans
- Sanity for pages and blog articles, with a standalone Studio
- ESLint, Prettier, and Vitest
- Bun and Vercel

## Project structure

```text
app/
  (web)/[locale]/   # Localized pages: [[...uri]] (Sanity pages), blog, not-found, Open Graph image
  feed.xml/ llms.txt/ robots.ts sitemap.ts manifest.ts global-not-found.tsx shared-web-layout.tsx
components/         # Small, feature-agnostic building blocks (links, code block, figure, table)
features/           # blog, pages, sections, sanity (client, fetch, media, link, rich text), i18n, site, styles
sanity/             # Standalone Sanity Studio: schemas/documents, schemas/fields, schemas/sections, structure
docs/               # Deployment notes and per-feature documentation
public/             # Icons
proxy.ts            # Serves English without a prefix
```

Every page is a `page` document in Sanity, rendered by `app/(web)/[locale]/[[...uri]]/` from its sections; the CV is the homepage, `/` in English and `/nl` in Dutch. The blog is `/blog` and `/nl/blog`. `proxy.ts` serves English without a prefix. UI strings are in `features/i18n/`. Profile details are repeated in a few places, so keep them in sync ([Pages and sections](docs/features/pages-and-sections.md)).

## Development

```bash
bun install
bun run dev
```

The site is available at [http://localhost:3000](http://localhost:3000). Copy `.env.example` to `.env.local` for the Sanity project the blog reads from. Write content in the Studio with `npm --prefix sanity install` and `npm --prefix sanity run dev`.

Format the code and run the full quality check before committing:

```bash
bun run format
bun run qa
```

`bun run qa` checks formatting, lints, type-checks, runs the Vitest suite, and builds the production deployment. Use `bun run test:watch` while working on tests.

## License

The source code is available under the [MIT License](LICENSE). The CV content, name, and images are not covered by it and remain all rights reserved. See [CONTRIBUTING.md](CONTRIBUTING.md) to contribute.
