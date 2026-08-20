# kevinpierik-dev

Personal site of Kevin Pierik — a static Next.js one-pager built as a small
desktop: a file you can open, a window you can drag, and nothing else. No CMS;
what little content there is lives in typed TypeScript under `src/`.

## Requirements

- [Bun](https://bun.com) 1.3.14 (pinned in `package.json` → `packageManager`)
- Node 24 (`.nvmrc`) — only for tooling that shells out to node

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
| `bun run qa` | Lint + typecheck — run this before committing |

## Project structure

```text
src/
├── app/
│   ├── layout.tsx        # Site-wide metadata, font, JSON-LD, Speed Insights
│   ├── page.tsx          # The desktop: header row, files, window, status bar
│   ├── global-not-found.tsx  # 404 — own <html>, full-screen BIOS screen
│   ├── global-error.tsx  # Last-resort error boundary
│   ├── globals.css       # Tailwind v4 theme: design tokens live here
│   ├── opengraph-image.tsx   # Generated 1200×630 OG image
│   ├── llms.txt/route.ts # llms.txt for AI assistants
│   ├── robots.ts         # robots.txt
│   └── sitemap.ts        # sitemap.xml
├── components/
│   ├── desktop/          # Desktop (state), WindowFrame, window contents
│   ├── sections/         # LocalTime (clock) and BiosScreen (404)
│   └── ui/               # shadcn components (shadcn-owned)
├── config/site.ts        # Name, description, base URL, email, socials
├── content/              # desktop.ts (files + About) and bios.ts (404 boot log)
├── lib/utils.ts          # cn()
└── types/svg.d.ts        # SVG-as-component typing (SVGR)
public/                   # Favicon PNGs (Hangul), wired via metadata.icons
```

## The desktop

- **Header row** — name left, `[NL]` plus a live Amsterdam clock right. Both tiny
  and mono, hugging the edge (`px-3`); there is no nav, because there is nothing
  to navigate to yet.
- **Files** — `desktopFiles` in `src/content/desktop.ts`: `About` and
  `Privacy`. An icon fills in while its window is open.
- **Window** — draggable by its title bar, kept inside the viewport, closable,
  and movable with the arrow keys once the title bar has focus. Position is held
  in `Desktop`, so closing and reopening keeps it where you left it. Windows
  cascade and the last one you touch comes to the front.
- **Copyright** — inside the About window, not in a bar.
- **404** — its own document: a full-screen BIOS boot screen that prints the
  route you actually asked for. Any key or tap reboots to the homepage.

Adding a second file means adding an entry to `desktopFiles` and a matching
branch in `Desktop`. Keep windows content-only; the frame handles chrome, drag
and keyboard movement.

## Editing content

- **Name, description, base URL, email, socials** — `src/config/site.ts`. The
  header, status bar, About window, metadata, sitemap, `robots.txt`, `llms.txt`
  and the JSON-LD `sameAs` all read from it.
- **About window** — `src/content/desktop.ts`.
- **404 screen** — `src/content/bios.ts` (vendor string, boot-log lines).

`social` takes `{ label, href }` entries; they render in the About window and as
`sameAs` in the Person JSON-LD, so search engines tie the profiles to you.

## Metadata

Metadata follows the Next.js docs: every route exports its own `metadata`
object, with the site-wide defaults in `src/app/layout.tsx`. **Nested fields
(`openGraph`, `twitter`, `robots`, `alternates`) are replaced, not merged**, by
the last segment that defines them — spread a shared constant if a page needs to
override one field and keep the rest.

Set `NEXT_PUBLIC_SITE_URL` per environment: the full origin, with protocol, no
trailing slash (`https://kevinpierik.dev`). Without it, dev falls back to
`http://localhost:3000` and a production build to `https://kevinpierik.dev`. It
drives canonicals, `sitemap.xml`, `robots.txt`, `llms.txt`, `metadataBase` and
the domain shown in the OG image.

## Design tokens

`src/app/globals.css` is the single source of truth (Tailwind v4 `@theme`):

- Palette: `paper` (#ffffff), `ink` (#232323), `ink-deep`, `ink-shade`,
  `ink-soft`, `mist`, `orange`, `sand` → `bg-ink`, `text-mist`, …
- shadcn semantics map onto them: `bg-background`, `text-muted-foreground`, …
- The site runs dark: `<html>` carries `dark`, so `--background` is
  `--color-ink` (#232323) — the same tint the reference site uses, not pure
  black. No theme toggle.
- Text on that background needs at least 70% foreground opacity to clear 4.5:1.
  `text-foreground/45` measures 3.9:1 and fails, `aria-hidden` or not.
- The BIOS palette (`--color-bios-*`) belongs to the 404 screen only.
- Geist Mono is the base font for the whole site. See the font notes in
  `AGENTS.md` before adding a second family.

## Favicon

`public/icon-light.png` and `public/icon-dark.png` are the name in Hangul (케빈),
transparent, wired up in `layout.tsx` through `metadata.icons` with
`prefers-color-scheme` media queries — ink glyphs on a light tab strip,
off-white on a dark one. `public/favicon.ico` is the same PNG under the legacy
filename (browsers sniff content, not extension). They are rendered images, so
they do not depend on the visitor having a Hangul font.

## Deploying to Vercel

1. Push, then import the repo at [vercel.com/new](https://vercel.com/new).
2. Framework preset: Next.js. Root directory: the repo root.
3. Environment variables: `NEXT_PUBLIC_SITE_URL` — the production domain for
   Production; leave Preview unset so previews fall back to it.
4. Add the domain under Settings → Domains.
5. Enable Speed Insights under Project → Speed Insights, or the package collects
   nothing. It is skipped entirely outside Vercel.

`main` builds Production; every other branch gets a Preview deploy.

GitHub over SSH runs on port 443 here (`~/.ssh/config`), because port 22 is
blocked on this network.

## Lighthouse

Fully static, no render-blocking CSS (`experimental.inlineCss`). Measured with
Lighthouse 13 against `bun run start`, mobile form factor, varying only the
network:

| Network profile | Performance |
| --- | --- |
| Slow 4G (1.6 Mbps / 150 ms — Lighthouse default) | 99 |
| Fast 4G (9 Mbps / 40 ms) | 100 |
| Wifi (30 Mbps / 10 ms) | 100 |

Accessibility, SEO and Agentic Browsing are 100; desktop is 100 across the
board. The only gap is LCP on the simulated slow-4G profile, where the single
23 KB webfont sits on the critical path.

Speed Insights only renders when `VERCEL_ENV` is set, so nothing 404s locally
and Best Practices stays at 100. Lighthouse still refuses to audit the 404 page
— it rejects any non-2xx document.
