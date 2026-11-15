# Layout and typography

The site aims for an editorial, almost unstyled look, modelled on nunocoelho.me: one font at one size, muted secondary text, no rules or boxes, and a lot of white space.

## Container

`app/[lang]/layout.tsx` renders the header and footer at full width, with the same 1.5rem side padding, and between them a container that copies nunocoelho.me. The header and footer frame every page; only page content goes in the container. The container is at most 1440px wide, with 3.5% side padding (at least 1.5rem, so narrow screens line up with the header and footer). From 800px, `<main>` gets another 16.9583% on each side, so the CV sits in the middle two-thirds. Running text stops at 80ch, following the Modern Web Guidance typography guide.

## Site header

`features/site/site-header/index.tsx` spans the full width of the page, with 1.5rem of side padding. On the left is the name, the page's `<h1>`, with the role below it in `muted`. On the right is the site navigation, a ui-sdk `NavigationMenu` with `subtle` links ([Links and buttons](links-and-buttons.md)): for now only Index, the homepage in the current language, marked `current`. Add Blog there as another `NavigationMenuItem` once there are posts. Profile links don't go in the header; they are rows in the Socials section of the CV.

`<main>` is labelled by that `<h1>` through `aria-labelledby="page-title"`. Before the header, `app/[lang]/layout.tsx` renders a "Skip to content" link to `#main` (`skipLabel` in the dictionaries) that only appears at the top left while it has keyboard focus. It is a plain `<a>`, not Next.js `Link`: Next.js handles hash links itself and doesn't move focus, so the next Tab would land back in the header. Lenis's anchor handling doesn't call `preventDefault`, so the browser moves focus to `<main>`. The header and footer read the language themselves through `getLocale()`, so pages don't pass it down.

## Site footer

`features/site/site-footer/index.tsx` spans the full width and sits 10 lines below the content, in `muted`: the copyright line (the year is taken at build time), a one-line colophon, and the [language switcher](languages.md), plain text without an icon.

## Typography

- `features/fonts/index.ts` loads [Geist Serif](https://vercel.com/font?type=serif) Regular from the `geist` package (`geist/font/serif/regular`, not yet on Google Fonts), exposed to Tailwind as `font-serif` and set on `<html>` in `typography.css`. Importing only the Regular variant keeps the Square, Triangle, and Heart files out of the download.
- Geist Serif has one weight: the variable font's only axis is `ELSH`, the serif shape. More weights are announced; until then everything, headings included, is set at 400; don't add other weights, or the browser fakes a bold.
- All text is 0.875rem (14px) with a unitless line height of 1.5715 (22px). Headings keep that size and weight, so hierarchy comes from colour (`foreground` against `muted`) and spacing.
- Spacing is set in `lh`, so it follows the line height. See [MDX content](mdx-content.md) for the CV.

## Smooth scrolling

`features/lenis.tsx` mounts [Lenis](https://github.com/darkroomengineering/lenis) for the whole page from `app/[lang]/layout.tsx`, so the 404 page doesn't get it. Its stylesheet is imported in `features/style/global.css`.

- `respectReducedMotion` turns smoothing off when the system asks for reduced motion.
- `anchors` makes in-page `#` links scroll smoothly too.

The page scrolls the document itself; don't put the content in its own scroll container, or Lenis has nothing to drive.
