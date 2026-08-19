# kevinpierik-dev

Personal site of Kevin Pierik — a static Next.js one-pager. No CMS: all content
lives in typed TypeScript modules under `src/content/`, versioned in git.

## Requirements

- [Bun](https://bun.com) 1.3.14 (pinned in `package.json` → `packageManager`)
- Node 24 (`.nvmrc`) — only needed by tooling that shells out to node

## Getting started

```bash
bun install
cp .env.example .env.local
bun dev
```

The site runs on [http://localhost:3000](http://localhost:3000).

## Scripts

| Script | Description |
| --- | --- |
| `bun dev` | Dev server (Turbopack, hot reload) |
| `bun run build` | Production build |
| `bun run start` | Serve the production build |
| `bun run lint` | ESLint |
| `bun run typecheck` | `tsc --noEmit` |
| `bun run qa` | Lint + typecheck — run before committing |

## Project structure

```text
scripts/
├── generate-text-field.mjs   # repeated-phrase field → src/content/text-field.ts
└── generate-ascii-text.mjs   # figlet text → src/content/ascii-text.ts
src/
├── app/
│   ├── layout.tsx        # Site-wide metadata, fonts, lenis
│   ├── page.tsx          # Homepage: the name, nothing else
│   ├── privacy-policy/   # Legal pages, rendered by ContentPage
│   ├── terms-of-service/
│   ├── global-not-found.tsx  # 404 — own <html>, full-screen BIOS screen
│   ├── globals.css       # Tailwind v4 theme: design tokens live here
│   └── … (favicon PNGs live in public/, wired via metadata.icons)
│   ├── opengraph-image.tsx   # Generated 1200×630 OG image
│   ├── llms.txt/route.ts # llms.txt for AI assistants
│   ├── robots.ts         # robots.txt
│   └── sitemap.ts        # sitemap.xml
├── components/
│   ├── layout/           # Container, footer, ascii panel, content shell, lenis
│   ├── sections/         # TextFieldBackdrop (footer) and BiosScreen (404)
│   └── ui/               # shadcn components (shadcn-owned)
├── config/site.ts        # Name, description, base URL, email, legal links
├── content/              # Generated ASCII (ascii-text.ts, text-field.ts) + bios.ts
├── lib/utils.ts          # cn()
└── types/svg.d.ts        # SVG-as-component typing (SVGR)
```

## The layout

Black canvas, nothing but the name — the rest stays empty until you decide what
goes there.

- **Homepage** — one viewport tall (`h-svh`) on the dark tint: the name small
  top-left, `[NL]` plus a live Amsterdam clock top-right, and a scroll hint
  bottom-left. No header, no nav, no copy.
- **Footer** — slides up over the pinned homepage as you scroll. Plain CSS
  (`main` is `sticky top-0`, the footer follows with `z-10`); lenis only makes the
  scroll smooth. It carries a faint field of repeated phrases as a backdrop, the
  bordered ASCII panel ("more is coming"), the legal links right, and the
  copyright plus email bottom-left.
- **404** — its own document, a full-screen BIOS boot screen that prints the
  route you actually asked for. Any key or tap reboots to the homepage.

## The ASCII art

Both pieces are generated once and committed, so nothing is computed at runtime:

```bash
bun run generate:ascii   # the figlet block in the footer panel
bun run generate:field   # the repeated-phrase backdrop behind it
```

To change the panel wording, edit the `entries` array in
`scripts/generate-ascii-text.mjs` (any figlet font works). To change the
backdrop, edit `PHRASES` in `scripts/generate-text-field.mjs`.

Both generators export the real column and row count next to the art, and the
components scale from those numbers — so regenerating at a different size needs
no CSS change. `AsciiPanel` is a `@container`, so the block scales to the panel
it sits in, not to the viewport.

There was an ASCII Saturn on the homepage for one commit. If you want it back:
`git show cad0e51 -- scripts/generate-canvas.mjs src/components/sections/canvas-backdrop.tsx`.

## Editing content

- **Name, domain, description, version, email, legal links** —
  `src/config/site.ts`. The footer, metadata, sitemap, `robots.txt` and
  `llms.txt` all read from it.
- **404 screen** — `src/content/bios.ts` (vendor string, boot-log lines).
- **Legal pages** — the copy sits in the two page components. I wrote them to
  match what this site actually does (no cookies, no analytics, no forms); they
  are not reviewed by a lawyer, and they need updating the moment you add
  analytics, a form or embeds.

## Metadata

Metadata follows the Next.js docs: every route exports a `metadata` object.

- Site-wide defaults (title template, description, Open Graph, Twitter, robots)
  live in `src/app/layout.tsx`.
- A page overrides only what it needs, and sets its own
  `alternates.canonical`.
- **Careful:** nested fields (`openGraph`, `twitter`, `robots`, `alternates`) are
  *replaced*, not merged, by the last segment that defines them. Spread a shared
  constant if a page needs to override one field and keep the rest.
- The OG image is generated at build time from `src/app/opengraph-image.tsx`.

Set `NEXT_PUBLIC_SITE_URL` per environment; it drives canonicals, `sitemap.xml`,
`robots.txt`, `llms.txt` and OG URLs. Without it, dev falls back to
`http://localhost:3000` and production to `https://kevinpierik.dev`.

## Design tokens

`src/app/globals.css` is the single source of truth (Tailwind v4 `@theme`):

- Palette: `paper`, `ink`, `ink-soft`, `mist`, `orange`, `sand` → `bg-paper`,
  `text-ink-soft`, …
- shadcn semantics map onto them: `bg-background`, `text-muted-foreground`, …
- The site runs on the dark palette: `<html>` carries `dark`, so `--background`
  is `--color-ink` (#232323) and the footer sits one step deeper on
  `--color-ink-deep` (#181818). There is no theme toggle.
- Anything on the dark background needs at least 70% foreground opacity to clear
  4.5:1 — `text-foreground/45` measures 3.9:1 and fails, `aria-hidden` or not.
- Fonts: `font-sans` (Geist), `font-mono` (Geist Mono, used for the BIOS bars
  and labels), `font-pixel` (Geist Pixel, `ELSH` variable axis 0–100).
- The BIOS chrome has its own tokens (`--color-bios-*`): grey bars with navy
  text, shared by the header, the footer bar and the 404 screen.

Fonts come from `next/font/google`, which downloads them at build time and
serves them from this domain — no runtime request to Google, no files in
`public/`.

## Favicon

`public/icon-light.png` and `public/icon-dark.png` are the name in Hangul (케빈),
transparent, wired up in `layout.tsx` through `metadata.icons` with
`prefers-color-scheme` media queries — so the glyphs are ink on a light tab strip
and off-white on a dark one. `public/favicon.ico` is the same PNG under the
legacy filename (browsers sniff content, not extension; contentarchitecture.dev
does exactly this too).

They are rendered images, not live text, so they do not depend on the visitor
having a Hangul font. To change them, edit and re-render
`icon-src.html`-style markup with headless Chrome, or swap in your own PNGs.

## Deploying to Vercel

1. Push to GitHub, then import the repo at [vercel.com/new](https://vercel.com/new).
2. Framework preset: Next.js. Root directory: the repo root.
3. Environment variables: `NEXT_PUBLIC_SITE_URL` — the production domain for
   Production, and the preview URL (or nothing) for Preview.
4. Add the domain under Settings → Domains.

`main` builds Production; every other branch gets a Preview deploy.

## Lighthouse

The build is fully static and ships no render-blocking CSS
(`experimental.inlineCss`). Measured with Lighthouse 13:

| | Performance | Accessibility | Best Practices | SEO | Agentic Browsing |
| --- | --- | --- | --- | --- | --- |
| Desktop | 100 | 100 | 100 | 100 | 100 |
| Mobile | 97 | 100 | 100 | 100 | 100 |

Mobile Performance is capped by LCP under Lighthouse's simulated slow 4G, which
charges the two preloaded Geist fonts (52 KB) to the critical path; the measured
render delay is ~140 ms. Dropping a font family is the only way to move it, and
that costs the design.

Keep the scores: no client components unless something is really interactive, no
unsized media, no third-party scripts without measuring, and interactive targets
at least 48px.

Lighthouse cannot audit the 404 — it refuses any page that answers with a 404
status. Its contrast was verified by hand: the lowest ratio on that screen is
6.7:1 against a 4.5 requirement.
