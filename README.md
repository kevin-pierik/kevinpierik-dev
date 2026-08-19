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
src/
├── app/
│   ├── layout.tsx        # Site-wide metadata, fonts, header/footer, scroll shell
│   ├── page.tsx          # Homepage: name + the pixel mark
│   ├── global-not-found.tsx  # 404 — own <html>, full-screen BIOS screen
│   ├── globals.css       # Tailwind v4 theme: design tokens live here
│   ├── icon.svg          # Favicon
│   ├── opengraph-image.tsx   # Generated 1200×630 OG image
│   ├── llms.txt/route.ts # llms.txt for AI assistants
│   ├── robots.ts         # robots.txt
│   └── sitemap.ts        # sitemap.xml
├── components/
│   ├── layout/           # Container, header, footer, skip link, lenis
│   ├── sections/         # PixelMark (homepage) and BiosScreen (404)
│   └── ui/               # shadcn components (shadcn-owned)
├── config/site.ts        # Name, description, base URL, domain, version, socials
├── content/bios.ts       # Boot-log copy for the 404 screen
├── lib/utils.ts          # cn()
└── types/svg.d.ts        # SVG-as-component typing (SVGR)
```

## The layout

The site is framed like a BIOS screen, so the homepage and the 404 belong to
each other:

- **Header** — a floating grey status bar (`fixed`, inset), domain on the left,
  version on the right.
- **Homepage** — one viewport tall (`h-svh`), name bottom-left, the clickable
  pixel mark bottom-right. `PixelMark` cycles Geist Pixel's `ELSH` axis, which
  morphs the glyph between solid and pixel-dot shapes.
- **Footer** — slides up over the pinned homepage as you scroll. That is plain
  CSS (`main` is `sticky top-0`, the footer follows with `z-10`); lenis only
  makes the scroll itself smooth.

There is deliberately no copy about you anywhere — only the name. Add content by
composing new blocks into `src/app/page.tsx`.

## Editing content

- **Name, domain, description, version, socials** — `src/config/site.ts`. The
  header, footer, metadata, sitemap, `robots.txt` and `llms.txt` all read from
  it, so one change updates every surface.
- **404 screen** — `src/content/bios.ts` (vendor string, boot-log lines).
- Add a social link and the footer grows a link list by itself; leave the array
  empty and it stays a version readout.

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
- Dark tokens are the inverted (ink) palette; the footer uses it directly. There
  is no theme toggle — add the `dark` class to a block to flip it to ink.
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
