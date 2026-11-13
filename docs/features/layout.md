# Layout and typography

The site aims for an editorial, almost unstyled look, modelled on nunocoelho.me: one font at one size, muted secondary text, no rules or boxes, and a lot of white space.

## Column

`<main>` and the footer share one centred column, at most 50rem wide with 1.5rem of side padding. The header spans the full width. Running text, such as the intro and the footer, stays within 36rem.

## Site header

`features/site/site-header/index.tsx` spans the full width. On the left is the name, the page's `<h1>`, with the role below it in `muted`. On the right is a `<nav>` with LinkedIn, GitHub, and Instagram as small `subtle` buttons ([Links and buttons](links-and-buttons.md)). On narrow screens the buttons wrap below the name.

`<main>` is labelled by that `<h1>` through `aria-labelledby="page-title"`.

## Site footer

`features/site/site-footer/index.tsx` sits 10 lines below the content and holds only the copyright line in `muted`. The year is taken at build time.

## Typography

- `features/fonts/index.ts` loads Geist through `next/font/google`, exposed to Tailwind as `font-sans`. The BIOS 404 keeps Tailwind's own `font-mono`.
- All text is 14px with a 22px line height. Headings keep that size and differ only in weight (500), so hierarchy comes from weight, colour, and spacing.
- Spacing is set in `lh`, so it follows the line height. See [MDX content](mdx-content.md) for the CV.

## Smooth scrolling

`features/lenis.tsx` mounts [Lenis](https://github.com/darkroomengineering/lenis) for the whole page from the `(web)` layout, so the BIOS 404 doesn't get it. Its stylesheet is imported in `features/style/global.css`.

- `respectReducedMotion` turns smoothing off when the system asks for reduced motion.
- `anchors` makes in-page `#` links scroll smoothly too.

The page scrolls the document itself; don't put the content in its own scroll container, or Lenis has nothing to drive.
