<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

The block above is managed by `next dev` — keep everything of ours below the
`END` marker.

---

## What this site is

`kevinpierik.dev` is a **one-page professional profile and curriculum vitae**.
The only public document is `/`. The only public fallback is the BIOS-style 404
for unknown routes. Sanity Studio remains available at `/studio`, but the
homepage deliberately has no CMS dependency and the Studio currently has no
content schemas.

| Layer | Choice |
| --- | --- |
| Framework | Next.js 16, App Router, static output where possible |
| React | React 19 |
| Styling | Tailwind CSS v4, CSS-first config in `features/style/` |
| CMS | Sanity v6 Studio, retained but not connected to the public page |
| Runtime | Bun locally and on the host; deployed on Vercel |
| Analytics | `@vercel/speed-insights`, only when `VERCEL_ENV` is set |

Run `bun run qa` before considering work complete. It runs linting and type
checking, and `typecheck` refreshes Next.js generated route types first.

## Folder layout

```text
app/          routes and metadata files
components/   shared, domain-neutral components
features/     page features, site configuration, styles, and 404 screen
sanity/       dormant, liftable Studio configuration
```

There is no `src/`. `@/*` maps to the repository root. Keep application code in
its feature directory; route files should compose features rather than own UI.
Imports use `@/*`, except inside `sanity/`, which must use relative imports so
it can be lifted into another project.

## Routes and metadata

- `/` is the canonical public page. It owns its canonical URL, description,
  language alternate, and profile JSON-LD.
- `app/(site)/layout.tsx` owns shared metadata, the `lang` attribute, global
  style import, font setup, and Vercel-only analytics.
- `app/(site)/not-found.tsx` and `app/global-not-found.tsx` retain the BIOS
  404. A global not-found document must declare its own `<html>` and `<body>`.
- `app/global-error.tsx` is the retained emergency error fallback and must use
  the shared site language.
- `robots.ts`, `sitemap.ts`, and `llms.txt/route.ts` must list or allow **only**
  canonical public content. Studio and API paths stay disallowed in `robots.txt`.
- Every route exports an appropriate `metadata` object. Never set
  `maximumScale` or `userScalable` in a viewport configuration.

## Accessibility and SEO

The homepage has one visible `<h1>` for the person’s name. Each top-level CV
section has an `<h2>`; individual education, skill, and employment entries use
`<h3>`. Do not create `h4`–`h6` merely to use every tag: add a deeper heading
only for a genuine subordinate content section, and never skip heading ranks.

Use landmarks and accessible names for main content, navigation, and sections.
Maintain visible focus styles, semantic lists for grouped information, native
links for external destinations, and the reduced-motion rules in
`features/style/animations.css`.

Structured data resides in `features/site/seo/structured-data.ts` and is
rendered through `components/json-ld.tsx`. Keep it consistent with visible
content and the canonical URL. Site identity, URL, locale, and default meta
description belong in `features/site/config.ts`.

## Sanity

Sanity is intentionally dormant. Keep `sanity.config.ts`, `sanity.cli.ts`,
`features/sanity/constants.ts`, `sanity/schemas/index.ts`, and the embedded
Studio route compile-safe. Do not add a runtime CMS fetch, preview route, or
schema without an explicit content-model requirement. The Studio has no public
SEO surface and remains disallowed from indexing.

## Styling and performance

Global styling is imported only through `features/style/global.css`; tokens live
in the other files under `features/style/`. The site is dark by default. Text
on dark surfaces requires at least a 4.5:1 contrast ratio. Server Components
are the default; add `"use client"` only where browser interaction is required.
Do not add third-party scripts without measuring their impact.

## Conventions

- Use Dutch commit messages, but English file names, code symbols, UI copy, and
  repository documentation.
- Use kebab-case file names.
- Put local environment values in `.env.local`; document required variables in
  `.env.example`.
- Use conventional, present-tense, lowercase commit messages, for example:
  `feat(home): verbetert metadata`.
- Do not add explanatory comments to committed code; document durable design
  decisions here instead.
