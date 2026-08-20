<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

The block above is managed by `next dev` — keep everything of ours below the
`END` marker.

---

## Stack

| Layer | Choice |
| --- | --- |
| Framework | Next.js 16 (App Router, RSC, fully static output) |
| React | 19 |
| Components | shadcn CLI (`style: base-nova`) on **Base UI** primitives — not Radix |
| Styling | Tailwind v4, CSS-first config in `src/app/globals.css` |
| Icons | `lucide-react` |
| Fonts | Geist Mono everywhere; Geist (sans) only in `ContentPage`; Geist Pixel only on the 404 |
| Smooth scroll | lenis, dynamically imported |
| Content | Typed TS modules in `src/content/`, partly generated — there is no CMS |
| Runtime | Bun on the host, deployed on Vercel |

Everything runs on the host: `bun dev`, `bun run qa`, `bun run build`. No Docker.

Run `bun run qa` (lint + typecheck) before calling work done.

## Next.js 16 traps confirmed in this repo

- `middleware.ts` no longer exists; it is `proxy.ts` exporting `proxy()`.
- `params` and `searchParams` are Promises — always `await` them.
- Turbopack is the bundler: loaders go under `turbopack.rules`, never `webpack`.
  Pass no `options` to a loader unless you have to — that path has bitten us
  before (every route 404s).
- Layout/page props come from the generated `LayoutProps<"/">` / `PageProps<…>`
  globals; do not hand-roll those types.
- Error boundaries get a `retry` prop, not `unstable_retry`.

## Metadata

Follow the Next.js docs: **every route exports its own `metadata` object.** No
wrapper helpers, no `createMetadata()` — that indirection was deliberately
removed.

- Site-wide defaults live in `src/app/layout.tsx`: `metadataBase`, title
  template, description, Open Graph, Twitter, robots, `formatDetection`, and the
  `viewport` export with `themeColor`.
- A page adds only what differs, plus its own `alternates.canonical`.
- **Nested fields are replaced, not merged.** A page that defines `openGraph`
  loses every `openGraph` field from the layout. To share part of one, export a
  constant and spread it (the pattern the Next docs recommend).
- Never set `maximumScale` or `userScalable` in `viewport` — it fails the
  Lighthouse accessibility audit.
- File conventions carry the rest: `icon.svg`, `opengraph-image.tsx`,
  `robots.ts`, `sitemap.ts`, `llms.txt/route.ts`. Keep them driven by
  `siteConfig`/`content` so a copy change updates every surface at once.
- JSON-LD goes inline in the route as the docs show — a plain `<script
  type="application/ld+json">` with `JSON.stringify(...).replace(/</g, "\\u003c")`.

## The 404 screen

`src/app/global-not-found.tsx` (enabled by `experimental.globalNotFound`)
renders its **own `<html>`/`<body>`**, so the site header and footer are not
around it. Two consequences:

1. It must declare the fonts and import `globals.css` itself.
2. **Navigating out of it needs a full document load.** A client transition
   (`router.push`, `next/link`) swaps the URL but leaves the 404 document in
   place — the homepage never renders. `BiosScreen` therefore uses
   `window.location.assign()` and a plain `<a href>`.

The BIOS palette (`--color-bios-*`) is a deliberate exception to the site
tokens; it belongs to this screen only. Boot-log copy lives in
`src/content/bios.ts`.

The keydown handler ignores `Tab`, `Shift` and modifier combos so keyboard users
can still reach the reboot link. Lighthouse cannot score this page: it refuses
any document that answers with a 404 status.

## Components and styling

Order of preference:

1. An existing component in `src/components/` — `Container`
2. A shadcn component in `src/components/ui/`
3. Pull a new one in: `bunx shadcn@latest add <component>`
4. Only then hand-roll, into `src/components/<domain>/`

`src/components/ui/` is shadcn-owned. Edit those files only to bind them to our
tokens, and keep the component API intact so future `add` runs stay clean. Base
UI primitives import per component: `import { Button } from
"@base-ui/react/button"`. For a link that looks like a button, use
`buttonVariants()` on an `<a>` instead of rendering the Button as an anchor.

- Utility classes belong *inside* a component, not sprinkled across call sites.
  The same class string twice is a component.
- Variants → `cva`; class merging → `cn()` with `className` last so callers can
  override; tag roots with `data-slot`.
- `Container` is padding only (24px, 120px from `lg`) — there is no max width.
  Constrain text with `max-w-prose` / `max-w-[NNch]` on the element itself.
- Flip a block to the ink palette by adding the `dark` class to it. There is no
  theme toggle and no `dark:` variants in components.
- The BIOS chrome (`--color-bios-*`) is shared by the header, the footer bar and
  the 404 screen. Keep those three in sync — they are one visual idea.

## Design tokens

`src/app/globals.css` is the single source of truth:

- Palette: `--color-paper`, `--color-ink`, `--color-ink-deep`,
  `--color-ink-soft`, `--color-mist`, `--color-orange`, `--color-sand`
- shadcn semantics (`--background`, `--muted-foreground`, …) map onto that
  palette; use `bg-background`/`text-muted-foreground` in components so inverted
  sections keep working
- Headings get their sizes from the base layer — do not restate them per page
- `font-mono` is for labels, nav and meta; `font-sans` for prose; `font-pixel`
  is the display accent (variable `ELSH` axis, 0–100)

Avoid arbitrary values for anything reusable — make it a token.

## Generated content

`src/content/ascii-text.ts` and `src/content/text-field.ts` are **generated
files** — never hand-edit them. Change the constants in
`scripts/generate-ascii-text.mjs` / `scripts/generate-text-field.mjs` and re-run
`bun run generate:ascii` / `bun run generate:field`.

The generators export the true column and row count next to the art, and the
components scale from those numbers, so art of any size keeps working without
touching CSS. `AsciiPanel` uses `@container` + `cqw`, so it scales to its panel
rather than the viewport. Both blocks are `aria-hidden` with an `sr-only` caption
where the art carries meaning — that is also what keeps the contrast audit happy
about a backdrop at 10% opacity.

Keep the art small: it ships inside the HTML (the backdrop is ~8 KB of very
compressible text).

## The scroll shell

`layout.tsx` wraps the page in the reveal structure:

The reveal lives in `src/app/page.tsx`, not in the root layout:

```tsx
<div className="relative">
  <main id="main" className="sticky top-0 h-svh overflow-hidden">…</main>
  <SiteFooter />
</div>
```

`main` is pinned while the footer scrolls up over it — plain CSS, no JS, no
scroll listeners. lenis only smooths the scroll itself. Consequences:

- The root layout renders `{children}` and nothing else, so each page owns its
  own `<main>` and footer. Pages that scroll normally use `ContentPage` (see the
  legal pages); only the homepage pins.
- The footer needs `relative z-10`; without the stacking context it slides
  *under* the pinned main.

## Fonts and the critical path

**next/font preloads based on where a font is *declared*, not where it is used.**
A font declared in the root layout is preloaded on every route, even if no
element on that route uses it. That cost us 46 KB of preloaded fonts on a page
with three lines of text.

So the declarations are placed deliberately:

- `Geist_Mono` — root layout. It is the base font (`html { font-mono }`), so
  every page needs it.
- `Geist` (sans) — declared inside `src/components/layout/content-page.tsx` and
  applied there via `geistSans.variable`, so only the legal pages pay for it.
- `Geist_Pixel` — declared in `global-not-found.tsx` with `preload: false`, so
  the 404 screen can use it without preloading it everywhere.

`--font-sans` therefore only resolves inside `ContentPage`; the theme gives it a
`ui-sans-serif, system-ui` fallback so `font-sans` elsewhere degrades sanely
instead of breaking. If you need sans on a new route, declare the font in that
route rather than hoisting it back into the root layout.

## Performance rules

The site is fully static and scores 100 on desktop across all Lighthouse
categories. What keeps it there:

- Server Components by default. `"use client"` only for real interaction
  (`SmoothScroll`, `BiosScreen`).
- `experimental.inlineCss` removes the render-blocking stylesheet. Leave it on.
- Measured: 3 preloaded fonts (69 KB) → LCP 2.6 s / Perf 97; 2 fonts (52 KB) →
  2.4 s / 98; 1 font (23 KB) → 2.3 s / 98. `preload: false` on the base font was
  also measured and made LCP *and* CLS worse, because the text swaps late.
  Lighthouse needs LCP ≈ 1.2 s for a perfect 25/25, which on simulated slow 4G
  means no webfont on the critical path at all.
- lenis is imported dynamically and skipped entirely under
  `prefers-reduced-motion`. Note that headless screenshots taken during a
  lenis-driven scroll capture half-painted frames — verify scroll behaviour with
  `getBoundingClientRect`, not with a picture.
- Interactive targets are at least 48px tall (`min-h-12`) so mobile audits pass.
- On the dark background, text needs ≥70% foreground opacity for 4.5:1. `/45`
  fails at 3.9:1, and `aria-hidden` does not exempt it from the contrast audit.
- No third-party scripts without measuring first.

## Analytics and the privacy policy

`@vercel/speed-insights` is the only third-party script on the site. Adding or
removing anything in that category means editing
`src/app/privacy-policy/page.tsx` in the same commit — that page makes concrete
claims about cookies, scripts and third-party requests, and a stale privacy
policy is worse than none.

Expect Best Practices to read 96 locally: `/_vercel/speed-insights/script.js`
404s outside Vercel and the console error trips `errors-in-console`.

## Conventions

- **Dutch** commit messages, **English** for file names, symbols, UI copy and
  repo docs.
- Conventional commits, present tense, lowercase:
  `feat(404): voegt bios-scherm toe`. No `Co-Authored-By` trailer, no ticket
  footer in this repo.
- Imports use the `@/*` alias, never deep relative paths.
- **No explanatory comments in committed code.** Components must read on their
  own; the *why* goes here or in the README.
- Local env values belong in `.env.local` (gitignored); `.env.example`
  documents the keys.
- SVGs live in `src/assets/` and import as React components through SVGR.
