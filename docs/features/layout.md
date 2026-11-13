# Layout and typography

The site aims for an editorial, almost unstyled look, modelled on nunocoelho.me: one font at one size, muted secondary text, no rules or boxes, and a lot of white space.

## Container

`app/[lang]/layout.tsx` renders the header and footer at full width, with the same 1.5rem side padding, and between them a container that copies nunocoelho.me. The header and footer frame every page; only page content goes in the container. The container is at most 1440px wide, with 3.5% side padding (at least 1.5rem, so narrow screens line up with the header and footer). From 800px, `<main>` gets another 16.9583% on each side, so the CV sits in the middle two-thirds. Running text stops at 80ch, following the Modern Web Guidance typography guide.

## Site header

`features/site/site-header/index.tsx` spans the full width of the page, with 1.5rem of side padding. On the left is the name, the page's `<h1>`, with the role below it in `muted`. On the right is the site navigation, a `<nav>` with small `subtle` buttons ([Links and buttons](links-and-buttons.md)): for now only Index, the homepage in the current language, marked `aria-current="page"`. Add Blog there once there are posts. Profile links don't go in the header; they are rows in the Socials section of the CV.

`<main>` is labelled by that `<h1>` through `aria-labelledby="page-title"`. The header and footer read the language themselves through `getLocale()`, so pages don't pass it down.

## Site footer

`features/site/site-footer/index.tsx` spans the full width and sits 10 lines below the content, in `muted`: the copyright line (the year is taken at build time), a one-line colophon, and a row with the [language switcher](languages.md) behind a globe icon on the left and the [theme switcher](color-scheme.md#theme-switcher) on the right.

## Typography

- `features/fonts/index.ts` loads Geist through `next/font/google`, exposed to Tailwind as `font-sans`. The BIOS 404 keeps Tailwind's own `font-mono`.
- All text is 0.875rem (14px) with a unitless line height of 1.5715 (22px). Headings keep that size and differ only in weight (500), so hierarchy comes from weight, colour, and spacing.
- Spacing is set in `lh`, so it follows the line height. See [MDX content](mdx-content.md) for the CV.

## Smooth scrolling

`features/lenis.tsx` mounts [Lenis](https://github.com/darkroomengineering/lenis) for the whole page from `app/[lang]/layout.tsx`, so the BIOS 404 doesn't get it. Its stylesheet is imported in `features/style/global.css`.

- `respectReducedMotion` turns smoothing off when the system asks for reduced motion.
- `anchors` makes in-page `#` links scroll smoothly too.

The page scrolls the document itself; don't put the content in its own scroll container, or Lenis has nothing to drive.
