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
├── generate-canvas.mjs   # renders the ASCII planet → src/content/canvas-art.ts
└── generate-ascii-text.mjs   # renders figlet text → src/content/ascii-text.ts
src/
├── app/
│   ├── layout.tsx        # Site-wide metadata, fonts, lenis
│   ├── page.tsx          # Homepage: canvas + name + footer
│   ├── privacy-policy/   # Legal pages, rendered by ContentPage
│   ├── terms-of-service/
│   ├── global-not-found.tsx  # 404 — own <html>, full-screen BIOS screen
│   ├── globals.css       # Tailwind v4 theme: design tokens live here
│   ├── icon.svg          # Favicon
│   ├── opengraph-image.tsx   # Generated 1200×630 OG image
│   ├── llms.txt/route.ts # llms.txt for AI assistants
│   ├── robots.ts         # robots.txt
│   └── sitemap.ts        # sitemap.xml
├── components/
│   ├── layout/           # Container, footer, ascii panel, content shell, lenis
│   ├── sections/         # CanvasBackdrop (home) and BiosScreen (404)
│   └── ui/               # shadcn components (shadcn-owned)
├── config/site.ts        # Name, description, base URL, email, legal links
├── content/              # Generated ASCII art (canvas-art.ts, ascii-text.ts) + bios.ts
├── lib/utils.ts          # cn()
└── types/svg.d.ts        # SVG-as-component typing (SVGR)
```

## The layout

Black canvas, nothing but the name — the rest is deliberately empty until you
decide what goes there.

- **Homepage** — one viewport tall (`h-svh`), an ASCII planet centred as a
  backdrop, the name bottom-left. No header, no nav.
- **Footer** — slides up over the pinned homepage as you scroll. Plain CSS
  (`main` is `sticky top-0`, the footer follows with `z-10`); lenis only makes
  the scroll smooth. It holds an ASCII panel ("more is coming") and a BIOS-style
  bar with copyright, email and the legal links.
- **404** — its own document, a full-screen BIOS boot screen that prints the
  route you actually asked for. Any key or tap reboots to the homepage.

## The ASCII art

Both pieces are generated once and committed, so nothing is computed at runtime:

```bash
bun run generate:canvas   # the planet on the homepage
bun run generate:ascii    # the figlet text in the footer panel
```

`scripts/generate-canvas.mjs` renders a shaded sphere with tilted, striated
rings; the constants at the top of the file are the dials (planet radius, ring
tilt, gaps, light direction, character ramps, grid size). It crops to the
bounding box and exports the real column/row count, which
`CanvasBackdrop` uses to scale the art to 90% of the width or 50% of the height,
whichever is smaller.

To change the footer wording, edit the `entries` array in
`scripts/generate-ascii-text.mjs` and re-run it. Any figlet font works.

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
  is pure black (`--color-void`) and the footer sits on `--color-ink`. There is
  no theme toggle.
- Fonts: `font-sans` (Geist), `font-mono` (Geist Mono, used for the BIOS bars
  and labels), `font-pixel` (Geist Pixel, `ELSH` variable axis 0–100).
- The BIOS chrome has its own tokens (`--color-bios-*`): grey bars with navy
  text, shared by the header, the footer bar and the 404 screen.

Fonts come from `next/font/google`, which downloads them at build time and
serves them from this domain — no runtime request to Google, no files in
`public/`.

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
