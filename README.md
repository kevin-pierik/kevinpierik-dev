# kevinpierik-dev

Personal site of Kevin Pierik — a static Next.js site built as a small desktop:
files and folders open into windows, including a browser-native PDF viewer for
the curriculum vitae. Content is edited in a Sanity Studio embedded at
`/sanity-studio`, with code-level defaults so the site builds before Sanity exists.

## Requirements

- [Bun](https://bun.com) 1.3.14 (pinned in `package.json` → `packageManager`)
- Node 24 (`.nvmrc`) — only for tooling that shells out to node

## Getting started

```bash
bun install
cp .env.example .env.local
bun dev
```

The site runs on [http://localhost:3000](http://localhost:3000). It works with an
empty `.env.local`: every window falls back to the copy in
`features/desktop/defaults.ts`.

## Connecting Sanity

One-time setup. Steps 1 to 3 need a Sanity account and a browser.

1. Log the CLI in to your Sanity account (opens a browser):

   ```bash
   bun run sanity:login
   ```

   Every Sanity command is wrapped as a `bun run` script, because `bunx` is not
   on the PATH in every shell here.

   If the project does not exist yet, create it first with
   `bun run sanity:login` followed by `./node_modules/.bin/sanity init --env`,
   which writes the project id and dataset into `.env.local`.

2. Allow the browser to talk to the Content Lake: open
   [localhost:3000/sanity-studio](http://localhost:3000/sanity-studio) and press **Add CORS
   origin**, or add `http://localhost:3000` under _API → CORS origins_ in
   [sanity.io/manage](https://sanity.io/manage) with credentials allowed. Until
   this is done the Studio cannot sign you in and `<SanityLive>` cannot connect.

3. Create a **Viewer** token under _API → Tokens_ and put it in `.env.local` as
   `SANITY_API_READ_TOKEN`. A public dataset serves published content without
   one; the token is what enables draft mode and the Presentation tool. Never
   commit it.

4. Push the current site content into the dataset so the Studio is not empty:

   ```bash
   bun run sanity:seed
   bun run sanity:import
   ```

   `sanity:import` talks to the HTTP API, so it needs no CLI login, but it does
   need a token with **Editor** rights in `SANITY_API_WRITE_TOKEN`. The site
   itself only ever reads, so keep `SANITY_API_READ_TOKEN` on Viewer rights and
   delete the write token once the import is done. `bun run sanity:import:cli`
   is the equivalent through the Sanity CLI if you prefer that.

   Append `-- --replace` to overwrite documents that already exist.

5. Restart `bun dev` and open
   [localhost:3000/sanity-studio](http://localhost:3000/sanity-studio).

## Editing content

| Where                   | What it drives                                                                            |
| ----------------------- | ----------------------------------------------------------------------------------------- |
| Site settings           | Name, email, version, social links, header navigation, default meta title and description |
| Windows → Home files    | The files in the top-left of `/`                                                          |
| Windows → Extra folders | The folders in the `/extra` sidebar, each opening a document or a PDF                     |
| Windows → Corner links  | The small links bottom-right, such as Privacy                                             |
| Posts                   | The `/writing` screen                                                                     |

Press **Presentation** in the Studio to edit the site side by side with a live
preview and click-to-edit overlays.

## Scripts

| Script                   | Description                                              |
| ------------------------ | -------------------------------------------------------- |
| `bun dev`                | Dev server (Turbopack, hot reload)                       |
| `bun run build`          | Production build                                         |
| `bun run start`          | Serve the production build                               |
| `bun run lint`           | ESLint                                                   |
| `bun run typecheck`      | `tsc --noEmit`                                           |
| `bun run qa`             | Lint + typecheck — run this before committing            |
| `bun run sanity:typegen` | Re-extract the schema and regenerate GROQ result types   |
| `bun run sanity:seed`    | Write `seed/content.ndjson` from the code-level defaults |
| `bun run sanity:deploy`  | Deploy the Studio to a `sanity.studio` subdomain         |

## Project structure

```text
app/
├── (site)/                # The site: one root layout, dark and no-scroll
│   ├── layout.tsx         # Metadata from settings, JSON-LD, Sanity Live
│   ├── page.tsx           # Home desktop
│   ├── not-found.tsx      # BIOS screen for notFound() inside the site
│   ├── extra/[slug]/      # Folder documents
│   └── writing/[slug]/    # Posts
├── sanity-studio/         # Second root layout, clean, for the Studio
├── api/draft-mode/        # Enable and disable draft mode
├── global-not-found.tsx   # BIOS screen for URLs matching no route
├── robots.ts, sitemap.ts, llms.txt/
components/                # flat primitives: button, link, json-ld, file-tree
features/
├── bios/                  # The 404 boot screen
├── blog/                  # Posts: query, resolve, reading time, post window
├── desktop/               # The desktop shell, windows, drag, defaults
├── draft-mode/            # Draft mode bar and route handler
├── rich-text/             # Portable text renderers
├── sanity/                # Client, live, image, normalisation, generated types
├── site/                  # Settings, header, SEO helpers, structured data
└── style/                 # CSS layers and `cn()`
sanity/                    # Schema and Studio structure (no app imports)
scripts/                   # `sanity-seed.ts`
seed/                      # Generated NDJSON
env.ts                     # All environment variables
```

## The desktop

- **Header row** — the name first, then the navigation from Site settings, with
  `[NL]` plus a live Amsterdam clock at the right. Everything is tiny and mono.
- **Files and folders** — `desktopWindow` documents in Sanity, grouped by
  `placement`. An icon fills in while its window is open.
- **Window** — draggable by its title bar, kept inside the viewport, closable,
  and movable with the arrow keys once the title bar has focus. Position is held
  in `Desktop`, so closing and reopening keeps it where you left it. Windows
  cascade and the last one you touch comes to the front.
- **Copyright** — appended to every text window, not in a bar.
- **404** — its own document: a full-screen BIOS boot screen that prints the
  route you actually asked for. Any key or tap reboots to the homepage.

Adding a file or folder is content work: create a `desktopWindow` in the Studio
with the right `placement`. Keep windows content-only; the frame handles chrome,
drag and keyboard movement.

Two things stay in code because no editor should have to touch them: the base URL
and locale in `features/site/config.ts`, and the BIOS boot log in
`features/bios/content.ts`.

## Metadata

Metadata follows the Next.js docs: every route exports its own `metadata`
object, with the site-wide defaults in `app/(site)/layout.tsx`. **Nested fields
(`openGraph`, `twitter`, `robots`, `alternates`) are replaced, not merged**, by
the last segment that defines them — spread a shared constant if a page needs to
override one field and keep the rest.

Set `NEXT_PUBLIC_SITE_URL` per environment: the full origin, with protocol, no
trailing slash (`https://www.kevinpierik.dev`). Without it, dev falls back to
`http://localhost:3000` and a production build to `https://www.kevinpierik.dev`. It
drives canonicals, `sitemap.xml`, `robots.txt`, `llms.txt`, `metadataBase` and
the domain shown in the OG image.

## Design tokens

`features/style/` is the single source of truth (Tailwind v4 `@theme`), split
into `tailwind.css`, `colors.css`, `animations.css` and the `global.css` barrel:

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
transparent, wired up in `app/(site)/layout.tsx` through `metadata.icons` with
`prefers-color-scheme` media queries — ink glyphs on a light tab strip,
off-white on a dark one. `public/favicon.ico` is the same PNG under the legacy
filename (browsers sniff content, not extension). They are rendered images, so
they do not depend on the visitor having a Hangul font.

## Deploying to Vercel

1. Push, then import the repo at [vercel.com/new](https://vercel.com/new).
2. Framework preset: Next.js. Root directory: the repo root.
3. Environment variables — set these for **Production, Preview and
   Development**, or a preview deploy silently renders the code-level fallbacks:

   | Variable                        | Value                                                                   |
   | ------------------------------- | ----------------------------------------------------------------------- |
   | `NEXT_PUBLIC_SITE_URL`          | The production domain. Leave Preview unset so previews fall back to it. |
   | `NEXT_PUBLIC_SANITY_PROJECT_ID` | From sanity.io/manage                                                   |
   | `NEXT_PUBLIC_SANITY_DATASET`    | `production`                                                            |
   | `SANITY_API_READ_TOKEN`         | The Viewer token. Secret — never a `NEXT_PUBLIC_` name.                 |

4. Add the domain under Settings → Domains.
5. Add the production origin (and `https://*.vercel.app` if you use previews)
   under _API → CORS origins_ in sanity.io/manage, credentials allowed. Without
   it `<SanityLive>` cannot connect and published edits will not appear until
   the next deploy.
6. Point the Studio at production: set `SANITY_STUDIO_PREVIEW_URL` is _not_
   needed here — the Studio is embedded, so Presentation previews whatever origin
   it is served from.
7. Enable Speed Insights under Project → Speed Insights, or the package collects
   nothing. It is skipped entirely outside Vercel.

Publishing in the Studio does not trigger a rebuild. `<SanityLive>` subscribes to
the Live Content API and invalidates the cache tags that `sanityFetch` wrote, so
published content appears on the deployed site without a deploy.

`main` builds Production; every other branch gets a Preview deploy.

GitHub over SSH runs on port 443 here (`~/.ssh/config`), because port 22 is
blocked on this network.

## Lighthouse

Fully static, no render-blocking CSS (`experimental.inlineCss`). Measured with
Lighthouse 13 against `bun run start`, mobile form factor, varying only the
network:

| Network profile                                  | Performance |
| ------------------------------------------------ | ----------- |
| Slow 4G (1.6 Mbps / 150 ms — Lighthouse default) | 99          |
| Fast 4G (9 Mbps / 40 ms)                         | 100         |
| Wifi (30 Mbps / 10 ms)                           | 100         |

Accessibility, SEO and Agentic Browsing are 100; desktop is 100 across the
board. The only gap is LCP on the simulated slow-4G profile, where the single
23 KB webfont sits on the critical path.

Speed Insights only renders when `VERCEL_ENV` is set, so nothing 404s locally
and Best Practices stays at 100. Lighthouse still refuses to audit the 404 page
— it rejects any non-2xx document.
