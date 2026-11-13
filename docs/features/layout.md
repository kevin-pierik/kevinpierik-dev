# Layout and typography

The site aims for an editorial, almost unstyled look, modelled on nunocoelho.me: one font at one size, muted secondary text, no rules or boxes, and a lot of white space.

## Column

The header, `<main>`, and the footer share one centred column, at most 50rem wide with 1.5rem of side padding, so their left edges line up. Running text, such as the intro and the footer, stays within 36rem.

## Site header

`features/site/site-header/index.tsx` has the name, the page's `<h1>`, with the role below it in `muted`. On the right is a `<nav>` with Email, LinkedIn, GitHub, and Instagram as `nav` links ([Links and buttons](links-and-buttons.md)), each followed by a `↗` that screen readers skip. On narrow screens the links wrap below the name.

`<main>` is labelled by that `<h1>` through `aria-labelledby="page-title"`.

## Site footer

`features/site/site-footer/index.tsx` sits 10 lines below the content, in `muted`: the copyright year, taken at build time, and a short colophon that links to the source. Keep the colophon true. The site does load Vercel Web Analytics and Speed Insights, which use no cookies, so don't claim that it collects no data at all.

## Typography

- `features/fonts/index.ts` loads Geist through `next/font/google`, exposed to Tailwind as `font-sans`. The BIOS 404 keeps Tailwind's own `font-mono`.
- All text is 14px with a 22px line height. Headings keep that size and differ only in weight (500), so hierarchy comes from weight, colour, and spacing.
- Spacing is set in `lh`, so it follows the line height. See [MDX content](mdx-content.md) for the CV.

## Smooth scrolling

`features/lenis.tsx` mounts [Lenis](https://github.com/darkroomengineering/lenis) for the whole page from the `(web)` layout, so the BIOS 404 doesn't get it. Its stylesheet is imported in `features/style/global.css`.

- `respectReducedMotion` turns smoothing off when the system asks for reduced motion.
- `anchors` makes in-page `#` links scroll smoothly too.

The page scrolls the document itself; don't put the content in its own scroll container, or Lenis has nothing to drive.
