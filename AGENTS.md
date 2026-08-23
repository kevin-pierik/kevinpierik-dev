<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

The block above is managed by `next dev` — keep everything of ours below the
`END` marker.

---

## What this site is

A site styled as a small desktop: a framed screen, a header row, files in the
top-left, and windows you can drag. Plus a 404 that pretends to be a BIOS boot
screen. Three screens: `/` (files), `/extra` (folders + document pane) and
`/writing` (posts in the same document pane). Nothing scrolls except a document
body.

Content comes from **Sanity**, edited in a Studio embedded at `/studio`. Every
piece of copy has a code-level default in `features/desktop/defaults.ts` and
`features/site/config.ts`, so the site builds and renders with no Sanity project
configured at all.

| Layer      | Choice                                                     |
| ---------- | ---------------------------------------------------------- |
| Framework  | Next.js 16 (App Router, RSC, fully static)                 |
| React      | 19                                                         |
| CMS        | Sanity v6, Studio embedded at `/studio`, `next-sanity` v13 |
| Components | shadcn CLI (`style: base-nova`) on **Base UI** — not Radix |
| Styling    | Tailwind v4, CSS-first config in `src/app/globals.css`     |
| Icons      | `lucide-react`                                             |
| Font       | Geist Mono, the only family on the site                    |
| Analytics  | `@vercel/speed-insights`, on Vercel only                   |
| Runtime    | Bun on the host, deployed on Vercel                        |

Run `bun run qa` (lint + typecheck) before calling work done. `typecheck` runs
`next typegen` first, because `PageProps` / `LayoutProps` come from generated
types that go stale whenever a route is added, moved or deleted.

## Folder layout

There is no `src/`. Next.js finds `app/` in the repo root, and `@/*` maps to
`./*`. The layout follows the-content-architecture convention:

```text
app/          routes; the site sits in a (site) group, the studio in sanity-studio/
components/   domain-less primitives, flat: button, link, json-ld, file-tree
features/     feature modules — the code lives here, not in app/
sanity/       schema + Studio structure. Liftable: no imports of app code
scripts/      one-off CLI scripts run with bun
seed/         generated NDJSON, not a build input
env.ts        every environment variable, read and defaulted in one place
```

Feature modules own their own data access. Per feature: `query.ts` (GROQ),
`resolve.ts` (fetch + normalise into view models), `types.ts`, and components.
A component that owns a query gets its own folder with an `index.tsx`.

`sanity/` is the one folder that must stay liftable into another project: every
import inside it is relative or an external package. Env, client and fetch code
therefore live in `features/sanity/`, not in `sanity/`.

## Next.js 16 traps confirmed in this repo

- `middleware.ts` is gone; it is `proxy.ts` exporting `proxy()`.
- `params` and `searchParams` are Promises — always `await` them.
- Turbopack is the bundler: loaders go under `turbopack.rules`, never `webpack`.
- Layout/page props come from the generated `LayoutProps` / `PageProps` globals.
- Error boundaries get a `retry` prop, not `unstable_retry`.
- Deleting a route leaves a stale `.next/types/validator.ts` behind, so
  `typecheck` fails until you rebuild. `bun run typecheck` runs `next typegen`
  first, which fixes this without a full build.
- `global-not-found.tsx` only covers URLs that match **no** route. A route that
  matches and calls `notFound()` renders `not-found.tsx` instead, which is why
  both exist: `app/global-not-found.tsx` (own `<html>`) and
  `app/(site)/not-found.tsx` (inside the site layout).
- Two root layouts, no top-level `app/layout.tsx`: `app/(site)/layout.tsx` owns
  the dark, no-scroll document, `app/sanity-studio/layout.tsx` gives the Studio a
  clean one. The Studio cannot live under the site layout — `body` is
  `overflow-hidden`, which breaks it. A route group is not required for a second
  root layout; any top-level segment can carry one.
- `not-found.tsx` lives **inside** `(site)`, not at `app/` root. That is what
  gives the BIOS screen the site layout: the dark document, `overflow-hidden` and
  Geist Mono. Moved to the root it would have no layout at all, because there is
  no top-level one — and it would need a hand-rolled shared layout component to
  get that chrome back.

## Sanity

`next-sanity` v13 in **non-strict mode**, with `cacheComponents` deliberately
**off**. `sanityFetch` then reads `draftMode()` itself and tags its own cache
entries, so every route stays statically prerendered and `<SanityLive>`
invalidates those tags when content is published. Turning `cacheComponents` on
would mean the three-layer Page/Dynamic/Cached pattern and prop-drilled
`perspective` / `stega` on every fetch — more machinery than three screens need,
and it trades the current fully-static output for a streamed shell.

Useful to know:

- `useCdn: false`. The Next data cache does the caching; the CDN would only add
  staleness on publish.
- The content model is three types: `settings` (singleton), `desktopWindow`
  (`placement` = `home` | `project` | `standalone`) and `post`. A window with a
  PDF renders the embed and otherwise it renders its portable text, with the
  `details` rows above it. A `project` window with a `cover` becomes an image
  tile in the left panel instead of a text row; images _inside_ a work are
  image blocks in its body, like a post.
- `<SanityLive>` and `<VisualEditing>` render **only** when
  `isSanityConfigured`. Without a project id they hammer
  `placeholder.api.sanity.io` and every failed request costs Best Practices
  points — the same reason Speed Insights is gated on `VERCEL_ENV`.
- `@sanity/icons` v5 removed root-entry exports. Import per icon subpath:
  `import {CogIcon} from "@sanity/icons/Cog"`.
- `sanity.config.ts` must not reach the RSC graph — the `sanity` package's
  `react-server` condition resolves `swr` without a default export and the build
  fails. The Studio page therefore renders a `"use client"` wrapper that does the
  config import.
- After changing a schema or a query, run `bun run sanity:typegen`.
  `sanity/schema.json` and `features/sanity/types.gen.ts` are committed so `qa`
  works without the Sanity CLI. Required fields are _not_ enforced in typegen, so
  every field arrives nullable and the resolvers are forced to handle it.
- Stega-encoded strings are template-literal branded types, so they never satisfy
  a literal union. Run control values (`placement`, hrefs, labels) through
  `text()` / `stegaClean` in `features/sanity/normalise.ts`; leave rendered
  portable text alone or click-to-edit breaks.
- **Never measure stega-encoded text.** The invisible payload counts as words, so
  anything derived from length is wrong in draft mode while looking fine in
  production. `features/blog/reading-time.ts` reported 3 min for a 45-word post
  until it cleaned the value first. Type checking does not catch this — the
  output is just silently wrong.
- `seed/content.ndjson` is generated by `bun run sanity:seed` from the code-level
  defaults, so the fallbacks and the seeded documents cannot drift.
  `bun run sanity:import` writes it over HTTP and needs a token with Editor
  rights in `SANITY_API_WRITE_TOKEN`; the site itself only ever needs Viewer.

## The desktop

`features/desktop/desktop-screen.tsx` is the server component that fetches and
composes; `features/desktop/desktop.tsx` is the only client component in the
tree, holding which windows are open, their stacking order and their offsets.

Window contents are passed **into** the client component as a `content` record
of server-rendered nodes. Keep it that way: it keeps the copy, the settings and
the portable-text renderers out of the client bundle. Moving that content inside
the client component measured 2 points of mobile Performance.

Adding a file to a screen is content work, not code work: create a
`desktopWindow` in the Studio with the right `placement`. Only a genuinely new
_kind_ of window body needs code.

`WorksRail` is the left panel on `/works`: an endless loop of cover tiles. It
keeps native scrolling and wraps `scrollTop` by one repeat unit at either end, so
the DOM stays proportional to the number of works instead of how far you scrolled
— fourteen tiles for one work, and one network request because they share an
image.

A repeat unit is a whole number of grid rows, `lcm(columns, works) / columns`, or
a single work would fill one cell and leave the other column empty. The pitch is
measured as the distance between two units so the gap between them counts. Only
the first unit is reachable by keyboard; the repeats are `aria-hidden` with
`tabIndex={-1}`, so each work is announced once and clickable everywhere.

`InfiniteDesk` pans and zooms. Drag or scroll to pan; ctrl or cmd plus wheel
zooms, which is also what a trackpad pinch sends. Scale runs 0.71 to 2.86 with
1 as the default, and the readout bottom-left shows that as a percentage — it
fades in while you zoom and out again after 1.2s, so it is absent at rest.

Zoom is anchored at the pointer: `t' = p - (p - t) * (s'/s)`, otherwise the desk
slides away from the cursor. The grid follows through `backgroundSize`, not a
transform, so it stays one repeating layer at any scale.

The windows live **outside** the desk in `Desktop`, so zooming moves the grid and
not them. That is deliberate: they carry their own drag and stacking, and scaling
them would fight the offsets that survive closing and reopening a window.

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

## Metadata

Follow the Next.js docs: **every route exports its own `metadata` object.** No
wrapper helpers.

- Site-wide defaults live in `app/(site)/layout.tsx`, now as an async
  `generateMetadata` because the title and description come from `settings`.
- Per-document overrides come from the `seo` object (`metaTitle`,
  `metaDescription`, `noIndex`). `noIndex` sets the robots tag _and_ drops the
  URL from the sitemap — both, or it leaks.
- **Nested fields are replaced, not merged.** A page that defines `openGraph`
  loses every `openGraph` field from the layout.
- Never set `maximumScale` or `userScalable` in `viewport` — it fails the
  accessibility audit.
- File conventions carry the rest: `opengraph-image.tsx`, `robots.ts`,
  `sitemap.ts`, `llms.txt/route.ts`. `sitemap.ts` and `llms.txt` enumerate
  Sanity documents; `llms.txt` keeps `dynamic = "force-static"` or it turns into
  a server-rendered route.
- The OG image is still rendered as the desktop UI. It reads the first home
  window from Sanity, so the card and the screen never drift apart. Do not add a
  Sanity `ogImage` override — it would bypass that.
- The favicon is **not** an app-dir `icon.*` file: two rendered PNGs in
  `public/` wired through `metadata.icons` with `prefers-color-scheme` queries,
  because the glyphs are Hangul and must not depend on the visitor's fonts.

## The 404 screen

`src/app/global-not-found.tsx` (enabled by `experimental.globalNotFound`)
renders its **own `<html>`/`<body>`**. Two consequences:

1. It declares its font and imports `features/style/global.css` itself.
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
→ 2.3 s. `preload: false` on the base font makes LCP _and_ CLS worse.

## Styling

- Tokens live in `features/style/`: `tailwind.css` (Tailwind import plus the
  `@theme` block), `colors.css` (semantic tokens), `animations.css` (reduced
  motion), and `global.css` which imports those three and holds `@layer base`.
  `global.css` is the only file a route imports. Palette:
  `paper` (#ffffff), `ink` (#232323), `ink-deep`, `ink-shade`, `ink-soft`,
  `mist`, `orange`, `sand`. shadcn semantics map onto them.
- The site runs dark: `<html>` carries `dark`, `--background` is `--color-ink`.
  No theme toggle, no `dark:` variants in components.
- **Text on the dark background needs ≥70% foreground opacity for 4.5:1.**
  `text-foreground/45` measures 3.9:1 and fails; `aria-hidden` does not exempt
  it from the contrast audit.
- Utility classes belong inside a component. Variants → `cva`; class merging →
  `cn()` with `className` last; tag roots with `data-slot`.
- `components/` is flat, no `ui/` subfolder; `components.json` aliases shadcn's
  `ui` at `@/components` so `shadcn add` still lands there. shadcn is scaffolding
  here, not a dependency — `button.tsx` has diverged, `collapsible.tsx` is a Base
  UI passthrough and `file-tree.tsx` is bespoke.
- Shared link styling lives in `linkVariants` (`components/link.tsx`). Portable
  text keeps a raw `<a>`: the href comes from Sanity and may be a `mailto:` or
  absent, which `next/link` cannot take.
- Interactive targets: Lighthouse 13 dropped both `tap-targets` and `font-size`,
  so small text and small controls no longer cost points. WCAG 2.2 still asks
  for 24×24px targets, so small controls keep a visually small box and grow
  their hit area with a `before:-inset-*` pseudo-element (see the close button).
- The page never scrolls: `html`/`body` carry `overscroll-none` and `body` is
  `overflow-hidden`, which is how the reference site kills rubber-banding too —
  no scroll library involved.
- A pointer-capturing drag handle swallows clicks on buttons inside it. The
  title bar's `onPointerDown` bails out when the event target is a button;
  without that, the close button never fires. Test drag handles with a real
  click, not a dispatched `click` event — a synthetic click skips pointerdown
  and hides the bug.

## Analytics and privacy

`@vercel/speed-insights` renders only when `process.env.VERCEL_ENV` is set, so it
never loads locally — its script lives at `/_vercel/speed-insights/script.js`,
which only Vercel's edge serves, and a 404 there trips `errors-in-console` and
costs Best Practices 4 points.

The privacy text lives in the **Privacy window** — a `desktopWindow` with
`placement: "corner"` — not a route. It makes concrete claims about cookies,
scripts and third-party requests. Adding or removing anything in that category
means updating that document in Sanity _and_ its fallback in
`features/desktop/defaults.ts` in the same commit, or the two drift and the
published claim becomes false.

The Studio at `/sanity-studio` ships the `sanity` bundle, so it is excluded from
the site's performance budget and disallowed in `robots.ts`. `/studio` keeps a
temporary redirect to it. It is code-split behind
its own route group and loads nothing on the site's routes.

## Images

Measured against the Content Lake, not assumed:

- **A tile is square, the image is not.** Consistency comes from the container:
  `aspect-square` on the tile with `object-contain` on the image, so a 16:9
  screenshot and a portrait shot sit in equal tiles without cropping. Sanity's
  crop would cut parts off a UI screenshot, which is why it is not used here.
  `aspect-ratio` is not a hard limit, so the image is absolutely positioned —
  in the flow a portrait image stretched a 157px tile to 182px.

- **Asset dimensions are in the `_ref`**: `image-<hash>-1800x1013-png`. `parseImageRef`
  reads them, so `width`/`height` need no extra query and no `metadata.dimensions`
  projection. Without them the intrinsic ratio is a guess and every image with an
  unexpected ratio costs CLS — the old renderer hardcoded 700x394.
- **Animated GIFs survive transforms.** `?w=800` keeps all frames. What does _not_
  work is `auto=format`: it leaves a GIF a GIF. Only an explicit `fm=webp` converts
  it, and that yields a genuinely animated WebP (`ANIM` + one `ANMF` per frame) at
  roughly two thirds of the size. Screen recordings compress far worse as GIF, so
  the real saving is larger.
- **No srcset for animated images.** Every candidate width is a full animation, so
  a srcset makes Sanity render several of them on the first hit for no benefit —
  the browser downloads one. `imageSources` caps animated images at 1200 instead.
- **`<img>` on purpose, not `next/image`.** Sanity's CDN already resizes and
  negotiates AVIF/WebP; routing that through the Next optimiser transforms twice
  and spends Vercel's image quota, and it cannot optimise animated images at all.
  `components/sanity-image.tsx` therefore builds its own srcset and carries the
  eslint disable for `no-img-element`.

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
- Kebab-case file names. GROQ lives in `query.ts`, shared projections in
  `fragment.ts`, both next to the feature that owns them.
- Conventional commits, present tense, lowercase:
  `feat(desktop): voegt sleepbaar venster toe`. No `Co-Authored-By`, no ticket
  footer.
- Imports use the `@/*` alias (now `./*`), never deep relative paths — except
  inside `sanity/`, which stays relative so it can be lifted out.
- **No explanatory comments in committed code.** The _why_ goes here.
- Local env values belong in `.env.local`; `.env.example` documents the keys.
- GitHub over SSH runs on port 443 (`~/.ssh/config`) — port 22 is blocked on
  this network.
