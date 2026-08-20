<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

The block above is managed by `next dev` — keep everything of ours below the
`END` marker.

---

## What this site is

A single page styled as a small desktop: a framed screen, a header row, files in
the top-left, and windows you can drag. Plus a 404 that pretends to be a BIOS
boot screen. There is no CMS, no blog, no scrolling — content lives in typed TS
under `src/content/` and `src/config/site.ts`.

| Layer | Choice |
| --- | --- |
| Framework | Next.js 16 (App Router, RSC, fully static) |
| React | 19 |
| Components | shadcn CLI (`style: base-nova`) on **Base UI** — not Radix |
| Styling | Tailwind v4, CSS-first config in `src/app/globals.css` |
| Icons | `lucide-react` |
| Font | Geist Mono, the only family on the site |
| Analytics | `@vercel/speed-insights`, on Vercel only |
| Runtime | Bun on the host, deployed on Vercel |

Run `bun run qa` (lint + typecheck) before calling work done.

## Next.js 16 traps confirmed in this repo

- `middleware.ts` is gone; it is `proxy.ts` exporting `proxy()`.
- `params` and `searchParams` are Promises — always `await` them.
- Turbopack is the bundler: loaders go under `turbopack.rules`, never `webpack`.
- Layout/page props come from the generated `LayoutProps` / `PageProps` globals.
- Error boundaries get a `retry` prop, not `unstable_retry`.
- Deleting a route leaves a stale `.next/types/validator.ts` behind, so
  `typecheck` fails until you rebuild. Build, then re-run qa.

## The desktop

`src/app/page.tsx` is a server component that owns the frame, the header and the
window *contents*. `src/components/desktop/desktop.tsx` is the only client
component in the tree: it holds which windows are open, their stacking order and
their offsets.

Window contents are passed **into** the client component as a `content` record
of server-rendered nodes. Keep it that way: it keeps the copy, `siteConfig` and
`src/content/` out of the client bundle. Moving that content inside the client
component measured 2 points of mobile Performance.

`WindowFrame` handles chrome, drag, and keyboard movement:

- Dragging uses pointer capture on the title bar and moves the window with a
  `transform`, not `left`/`top`.
- Position is a delta from the CSS-centred rest position, clamped to the
  **offset parent** (the desktop area), so a window can never leave the frame.
- Movement state updates go through the functional form
  (`onMove((previous) => …)`). Reading the state from the render closure loses
  steps when events arrive in the same tick — three arrow keys moved the window
  16px instead of 48px before this was fixed.
- Offsets live in `Desktop`, so closing and reopening a window keeps its place.

Adding a file: add an entry to `desktopFiles`, add a matching key to the
`content` record in `page.tsx`, and write a server component for the body.

## Metadata

Follow the Next.js docs: **every route exports its own `metadata` object.** No
wrapper helpers.

- Site-wide defaults live in `src/app/layout.tsx`.
- **Nested fields are replaced, not merged.** A page that defines `openGraph`
  loses every `openGraph` field from the layout.
- Never set `maximumScale` or `userScalable` in `viewport` — it fails the
  accessibility audit.
- File conventions carry the rest: `opengraph-image.tsx`, `robots.ts`,
  `sitemap.ts`, `llms.txt/route.ts`. Keep them driven by `siteConfig`.
- The favicon is **not** an app-dir `icon.*` file: two rendered PNGs in
  `public/` wired through `metadata.icons` with `prefers-color-scheme` queries,
  because the glyphs are Hangul and must not depend on the visitor's fonts.

## The 404 screen

`src/app/global-not-found.tsx` (enabled by `experimental.globalNotFound`)
renders its **own `<html>`/`<body>`**. Two consequences:

1. It declares its font and imports `globals.css` itself.
2. **Navigating out of it needs a full document load.** A client transition
   swaps the URL but leaves the 404 document in place, so `BiosScreen` uses
   `window.location.assign()` and a plain `<a href>`.

The BIOS palette (`--color-bios-*`) belongs to that screen only. Its keydown
handler ignores `Tab`, `Shift` and modifier combos so keyboard users can still
reach the reboot link. Lighthouse cannot score this page: it refuses any
document that answers with a 404 status.

## Fonts and the critical path

**next/font preloads based on where a font is declared, not where it is used.** A
font declared in the root layout is preloaded on every route, even if nothing
uses it. That cost 46 KB of preloaded fonts on a page with three lines of text.

Geist Mono is declared in the root layout and is the base font
(`html { font-mono }`). It is the only family; `--font-sans` keeps a
`ui-sans-serif, system-ui` fallback in the theme for anything that asks for
`font-sans`. If you need a second family, declare it in the route that needs it.

Measured on the homepage: 3 preloaded fonts (69 KB) → LCP 2.6 s; 1 font (23 KB)
→ 2.3 s. `preload: false` on the base font makes LCP *and* CLS worse.

## Styling

- Tokens in `src/app/globals.css` are the single source of truth. Palette:
  `paper` (#ffffff), `ink` (#232323), `ink-deep`, `ink-shade`, `ink-soft`,
  `mist`, `orange`, `sand`. shadcn semantics map onto them.
- The site runs dark: `<html>` carries `dark`, `--background` is `--color-ink`.
  No theme toggle, no `dark:` variants in components.
- **Text on the dark background needs ≥70% foreground opacity for 4.5:1.**
  `text-foreground/45` measures 3.9:1 and fails; `aria-hidden` does not exempt
  it from the contrast audit.
- Utility classes belong inside a component. Variants → `cva`; class merging →
  `cn()` with `className` last; tag roots with `data-slot`.
- Interactive targets: Lighthouse dropped its `tap-targets` audit, but WCAG 2.2
  still asks for 24×24px. Small controls keep a visually small box and grow
  their hit area with a `before:-inset-*` pseudo-element (see the close button).

## Analytics and privacy

`@vercel/speed-insights` renders only when `process.env.VERCEL_ENV` is set, so it
never loads locally — its script lives at `/_vercel/speed-insights/script.js`,
which only Vercel's edge serves, and a 404 there trips `errors-in-console` and
costs Best Practices 4 points.

The privacy text lives in the **Privacy window**, not a route. It makes concrete
claims about cookies, scripts and third-party requests: adding or removing
anything in that category means editing `src/content/desktop.ts` in the same
commit.

## Performance rules

Fully static. Desktop scores 100 across all five categories; mobile is 99, with
the gap being LCP on Lighthouse's simulated slow-4G profile. On fast 4G and wifi
mobile is 100 too, so treat that last point as a scoring artefact.

- Server Components by default. `"use client"` only for real interaction.
- `experimental.inlineCss` removes the render-blocking stylesheet. Leave it on.
- No third-party scripts without measuring.

## Conventions

- **Dutch** commit messages, **English** for file names, symbols, UI copy and
  repo docs.
- Conventional commits, present tense, lowercase:
  `feat(desktop): voegt sleepbaar venster toe`. No `Co-Authored-By`, no ticket
  footer.
- Imports use the `@/*` alias, never deep relative paths.
- **No explanatory comments in committed code.** The *why* goes here.
- Local env values belong in `.env.local`; `.env.example` documents the keys.
- GitHub over SSH runs on port 443 (`~/.ssh/config`) — port 22 is blocked on
  this network.
