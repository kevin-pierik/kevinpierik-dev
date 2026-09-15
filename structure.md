# Project Structure

This repository is an Astro 7 site for the public profile and curriculum vitae of Kevin Pierik. The public site is currently code-driven. Content and metadata are intentionally hardcoded until the Sanity content model is ready; future Sanity integration should replace these values at the page and metadata boundaries rather than introduce a new global configuration layer.

## Repository layout

```text
.
├── public/                         # Static assets, icons, fonts, and Open Graph image
├── sanity/                         # Dormant, liftable Sanity Studio schemas and config
├── src/
│   ├── features/
│   │   ├── sanity/
│   │   │   └── studio.tsx          # React bridge for the embedded Studio
│   │   └── site/
│   │       └── seo/
│   │           ├── structured-data.ts
│   │           └── structured-data.test.ts
│   ├── layouts/
│   │   └── web.astro               # Shared HTML shell and page metadata
│   ├── pages/
│   │   ├── index.astro             # Public profile and CV
│   │   ├── 404.astro               # BIOS-style noindex error page
│   │   ├── llms.txt.ts              # LLM-readable site summary
│   │   ├── robots.txt.ts             # Crawler rules
│   │   ├── sitemap.xml.ts            # Canonical URL sitemap
│   │   └── studio/                   # On-demand Sanity Studio routes
│   └── styles/                       # Tailwind theme and global CSS layers
├── astro.config.mjs
├── env.ts                            # Sanity environment values
├── sanity.config.ts
├── sanity.cli.ts
├── structure.md
└── package.json
```

## Application boundaries

`src/pages/` contains Astro file-based routes and small static endpoints. Routes own their temporary page content. `src/layouts/web.astro` owns the shared document shell, canonical URL generation, default metadata, Open Graph metadata, icons, global styles, Vercel Analytics, and Speed Insights.

SEO structured data lives in `src/features/site/seo/structured-data.ts`. The profile JSON-LD currently contains hardcoded values that match the visible profile. The breadcrumb helper is generic and accepts page-specific items so future routes can add `BreadcrumbList` data without coupling it to the homepage.

The 404 page is deliberately separate from the profile page. It uses the shared web layout, remains `noindex`, renders its boot log directly as HTML, and uses the original BIOS palette as local arbitrary Tailwind classes in `src/pages/404.astro`.

## Content strategy

There is currently no `config.ts` content registry. Profile identity, metadata, contact details, social links, endpoint text, and page content are temporarily hardcoded at their points of use. This is intentional: these values are future Sanity content, not application configuration.

When the Sanity model is introduced, migrate content at these boundaries:

1. The profile and CV content in `src/pages/index.astro`.
2. Page title and description props consumed by `src/layouts/web.astro`.
3. Profile and page structured data in `src/features/site/seo/structured-data.ts`.
4. Generated `llms.txt`, `robots.txt`, and `sitemap.xml` values where they represent editable site content or routes.

Stable implementation details such as route behavior, analytics integration, CSS tokens, and Sanity project configuration should remain code-owned.

## Runtime and rendering

The Astro adapter targets Vercel with server output. Public profile and SEO endpoint routes are prerendered where appropriate. The Sanity Studio is the only on-demand route and is not an indexable public page.

```text
/          public profile and CV
/404       BIOS-style noindex fallback
/studio/*  Sanity Studio, noindex and on-demand
```

## Quality checks

Use Bun for dependency management and tests:

```bash
bun run test
bun run lint
bun run typecheck
bun run build
bun run qa
```

The project uses Bun's built-in test runner because the current tests are pure TypeScript functions and do not need an additional test framework.
