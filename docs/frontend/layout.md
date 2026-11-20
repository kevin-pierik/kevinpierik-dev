# Layout and typography

The site aims for an editorial, almost unstyled look, modelled on nunocoelho.me: one font at one size, muted secondary text, no rules or boxes, and a lot of white space.

## Container

`frontend/src/app/(web)/[locale]/layout.tsx` is only the shell: `<html>`, the skip link, and Lenis. The pages render the rest: the catch-all page and the 404 render the header, the container, and the footer; the blog layout renders the header and Sanity Live, and the blog pages their container and footer. The footer's language links depend on the page ([Languages](languages.md)).

The container is the `site-container` utility in `frontend/src/features/style/tailwind.css`: at most 1440px wide, with 3.5% side padding (at least 1.5rem, so narrow screens line up with the header and footer).

## Grid

From the `site` breakpoint (800px, `--breakpoint-site` in `tailwind.css`), every page lays out on one 12-column grid, the `grid-site` utility: 12 equal columns with a 1.75% gap. `<main>` is a `grid-site`, and every nested element that places content, such as a CV section, an entry, a blog post row, or the post body, is a full-width `grid-site` of its own. All grids are equally wide, so their columns line up, and a column number always means the same line on every page:

- CV: labels and dates in columns 3–4, content in columns 5–10, headings and intro from line 3 to 11.
- Blog index: dates in columns 3–4, title and description in columns 5–10, like the CV.
- Blog post: text in columns 4–9, centred; figures and tables in 3–10; `wide` figures in 2–11; the back link starts on line 3.

Don't use `subgrid` or absolutely positioned grid items for this: Safari placed them differently from Chromium. Below 800px everything stacks in one column. Running text on the CV stops at 80ch, following the Modern Web Guidance typography guide.

## Site header

`frontend/src/features/site/site-header/index.tsx` spans the full width of the page, with 1.5rem of side padding. It takes an optional `current`, `"index"` or `"posts"`. On the left is the name, with the role below it in `muted`. On a homepage the name is the page's `<h1>`; everywhere else it is a link to the homepage, because those pages have their own `<h1>`. On the right is the site navigation, a ui-sdk `NavigationMenu` with `nav` links in `muted`, the current one in `foreground` ([Links and buttons](links-and-buttons.md)): Index and Posts in the current language, with the current section marked `current`. Profile links don't go in the header; they are rows in the Socials section of the CV.

On the homepage, `<main>` is labelled by that `<h1>` through `aria-labelledby="page-title"`; the blog pages label `<main>` with their own `<h1>`. Before the header, `frontend/src/app/(web)/[locale]/layout.tsx` renders a "Skip to content" link to `#main` (`skipLabel` in the dictionaries) that only appears at the top left while it has keyboard focus. It is a plain `<a>`, not Next.js `Link`: Next.js handles hash links itself and doesn't move focus, so the next Tab would land back in the header. Lenis's anchor handling doesn't call `preventDefault`, so the browser moves focus to `<main>`. The header and footer read the language themselves through `getLocale()`, so pages don't pass it down.

## Site footer

`frontend/src/features/site/site-footer/index.tsx` spans the full width and sits 10 lines below the content, in `muted`: the copyright line (the year is taken at build time), a one-line colophon, and the [language switcher](languages.md), plain text without an icon. Its optional `alternates` prop maps each language to the page to link to; without it, the switcher links to the homepages.

## Typography

- `frontend/src/features/fonts/index.ts` loads the variable [Geist Sans](https://vercel.com/font) from the `geist` package (`geist/font/sans`), exposed to Tailwind as `font-sans` and set on `<html>` in `typography.css`. The OG image uses the same font.
- The CV and the blog index set everything, headings included, at 400 and 0.875rem (14px) with a unitless line height of 1.5715 (22px), so hierarchy comes from colour (`foreground` against `muted`) and spacing.
- Blog posts follow ui-sdk.dev's article headings: the `<h1>` at 1.75rem and weight 500, `<h2>` at 1.125rem and 500, `<h3>` at 0.9375rem and 500. Body text stays 14px. See [Posts](posts.md).
- Blog pages also load [Geist Mono](https://vercel.com/font) (`frontend/src/features/fonts/mono.ts`) for code, set on the blog layout only, so the CV doesn't download it.
- `typography.css` turns on antialiasing, `optimizeLegibility`, and `text-size-adjust: 100%`.
- Spacing is set in `lh`, so it follows the line height. See [Pages and sections](pages-and-sections.md) for the CV.

## Smooth scrolling

`frontend/src/features/lenis.tsx` mounts [Lenis](https://github.com/darkroomengineering/lenis) for the whole page from `frontend/src/app/(web)/[locale]/layout.tsx`, so the 404 page doesn't get it. Its stylesheet is imported in `frontend/src/features/style/global.css`.

- `respectReducedMotion` turns smoothing off when the system asks for reduced motion.
- `anchors` makes in-page `#` links scroll smoothly too.

The page scrolls the document itself; don't put the content in its own scroll container, or Lenis has nothing to drive.
