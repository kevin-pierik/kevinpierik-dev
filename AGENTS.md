# kevinpierik.dev

## What this site is

`kevinpierik.dev` is a one-page professional profile and curriculum vitae. The canonical public document is `/`; unknown public routes display the BIOS-style 404. Sanity Studio remains available at `/studio`, but the homepage deliberately has no CMS dependency and the Studio currently has no content schemas.

| Layer | Choice |
| --- | --- |
| Framework | Astro 7, static output where possible |
| UI | Astro components; React only for the Sanity Studio island |
| Styling | Tailwind CSS v4, CSS-first config in `src/styles/` |
| CMS | Sanity v6 Studio, retained but not connected to the public page |
| Runtime | Bun locally and on the host; deployed on Vercel |
| Analytics | `@vercel/speed-insights`, only when `VERCEL_ENV` is set |

Run `bun run qa` before considering work complete. It lints, type-checks, and builds the production deployment.

## Folder layout

```text
src/
├── features/     page features, site configuration, styles, and 404 screen
├── layouts/      shared document and metadata shells
└── pages/        file-based routes and static endpoints
sanity/           dormant, liftable Studio configuration
```

Keep application code in its feature directory; route files should compose features rather than own UI. Imports use `@/*` for `src/*`, except inside `sanity/`, which must use relative imports so it can be lifted into another project.

## Routes and metadata

- `/` is the canonical public page. It owns its canonical URL, description, language alternate, and profile JSON-LD.
- `src/layouts/site-layout.astro` owns shared metadata, the `lang` attribute, global styles, icon links, and Vercel-only analytics.
- `src/pages/404.astro` retains the BIOS 404. It must remain noindex.
- `robots.txt`, `sitemap.xml`, and `llms.txt` must list or allow only canonical public content. Studio and API paths stay disallowed in `robots.txt`.
- Public page and SEO endpoint routes should export `prerender = true`. The Studio is the only on-demand route.

## Accessibility and SEO

The homepage has one visible `<h1>` for the person’s name. Each top-level CV section has an `<h2>`; individual education, skill, and employment entries use `<h3>`. Do not create `h4`–`h6` merely to use every tag: add a deeper heading only for a genuine subordinate content section, and never skip heading ranks.

Use landmarks and accessible names for main content, navigation, and sections. Maintain visible focus styles, semantic lists for grouped information, native links for external destinations, and the reduced-motion rules in `src/styles/animations.css`.

Structured data resides in `src/features/site/seo/structured-data.ts` and is rendered by the homepage route. Keep it consistent with visible content and the canonical URL. Site identity, URL, locale, and default meta description belong in `src/features/site/config.ts`.

## Sanity

Sanity is intentionally dormant. Keep `sanity.config.ts`, `sanity.cli.ts`, `src/features/sanity/studio.tsx`, and the embedded Studio routes compile-safe. Do not add a runtime CMS fetch, preview route, or schema without an explicit content-model requirement. The Studio has no public SEO surface and remains disallowed from indexing.

## Styling and performance

Global styling is imported only through `src/layouts/site-layout.astro`; tokens live under `src/styles/`. The site is dark by default. Text on dark surfaces requires at least a 4.5:1 contrast ratio. Astro components are the default; add React only where client-side interaction is required.

## Conventions

- Use Dutch commit messages, but English file names, code symbols, UI copy, and repository documentation.
- Use kebab-case file names.
- Put local environment values in `.env.local`; document required variables in `.env.example`.
- Use conventional, present-tense, lowercase commit messages, for example: `feat(home): verbetert metadata`.
- Do not add explanatory comments to committed code; document durable design decisions here instead.
