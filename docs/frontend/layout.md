# Layout and typography

The site aims for an editorial, almost unstyled look, modelled on nunocoelho.me: one font at one size, muted secondary text, no rules or boxes, and a lot of white space.

## Container

`frontend/src/app/layout.tsx` is the only root layout: `<html>`, the site metadata and viewport, the global stylesheet, the font, the skip link, and Lenis. Pages render the header, `<main class="site-container">`, and footer as siblings. The public site uses English copy.

The container is the `site-container` utility in `frontend/src/features/style/tailwind.css`: full width, with side padding of 3.5% (at least 1.5rem), growing on wide screens so the content stays centred at 70rem (1120px). The padding does the centring instead of a `max-width`, so the header blur and the carousel can still reach the screen edges. The header, `<main>`, and footer all use it, so their edges line up.

## Columns

Pages follow the Figma design, which uses centred columns inside the 70rem container instead of a column grid. Each child of a page body or article gets `mx-auto` and a maximum width:

- Pages and the posts index: text, figures, and tables at most 55.3125rem (885px) wide. Sections marked `data-full` (List and Carousel) and `wide` figures use the full container.
- Homepage: the centred hero, then the sections 10rem (6rem on small screens) apart. List sections put the heading on the left, sticky while the list scrolls by, and the accordion on the right ([Pages and sections](pages-and-sections.md#list)).
- Article: the centred title (at most 47.5rem wide) and meta; text and the call to action at most 41.125rem (658px); figures and tables 55.3125rem; `wide` figures the full container.
- Contact page: a centred intro like the homepage hero, then two short sections in a centred 40rem column.
- 404: a centred block in the middle of a 35rem tall `<main>`.

The widths come from the Figma frames at 1440px; check them there before changing one. Below the `site` breakpoint (800px, `--breakpoint-site` in `tailwind.css`) everything is full width within the container padding.

## Site header

`frontend/src/features/site/site-header/index.tsx` sits in the same `site-container` as `<main>` and the footer, so the name lines up with the footer's "Connect" and the navigation with the copyright.

The header is `sticky` at the top of the page and spans the full width. Behind it, `.header-blur` in `frontend/src/features/style/global.css` draws a progressive blur: a `background` tint that fades out, and three stacked `backdrop-filter` layers (1px, 4px, and 12px) whose gradient masks end higher the stronger the blur is. The layers are sibling `<div>`s, not pseudo-elements, because a `mask` or `backdrop-filter` on a parent would make the children blur only that parent instead of the page. The blur reaches 2rem below the header, so content fades out instead of being cut off. `html` has `scroll-padding-top: 7rem`, a bit more than the header's height, so focused elements and anchor targets aren't hidden under it; Lenis reads the same value for its anchor scrolling. It takes an optional `current` page. On the left is the name, a link to the homepage, with the role below it in `muted`; both are paragraphs on every page. From the `site` breakpoint, the right side has the site navigation, a ui-sdk `NavigationMenu` with `pill` links in `muted`, the current one in `foreground` ([Links and buttons](links-and-buttons.md)): the pages listed in the `settings` document's navigation, with the current one marked `current`. After it comes a `primary` "Get in touch" pill to `/contact`.

Below the `site` breakpoint, the navigation moves into a menu. A menu button with a two-line icon opens a full-screen `popover="auto"` (`#site-menu`) through `popovertarget`, so it needs no JavaScript to open, closes on Escape or a click outside, and returns focus to the button. The popover repeats the header bar, with a close button where the menu button was, then Home and the navigation links at 1.875rem, the email address and profiles, and a full-width "Get in touch" button at the bottom. While it is open, `:root:has(.site-menu:popover-open)` stops the page from scrolling, and `data-lenis-prevent` keeps Lenis from scrolling the page behind it. `close-menu.tsx` makes everything outside the menu `inert` while it is open, so Tab stays in the menu instead of moving to links hidden behind it. `close-menu.tsx` is a small client component that hides the popover when the path changes, because the header persists across client-side navigations. The animations live in `global.css`, following the Modern Web Guidance guide for animating the top layer: the popover fades in from `@starting-style` and out with `display` and `overlay` transitioned with `allow-discrete`. Only when the visitor allows motion, the close icon turns from the two lines into a cross and the links rise in one after another (`--index` sets the delay).

On the homepage, `<main>` is labelled by the hero's `<h1>` through `aria-labelledby="page-title"`; other pages use their own `<h1>`, screenreader-only for Sanity pages. Before the header, `frontend/src/app/layout.tsx` renders a "Skip to content" link to `#main` that only appears at the top left while it has keyboard focus. It is a plain `<a>`, not Next.js `Link`: Next.js handles hash links itself and doesn't move focus, so the next Tab would land back in the header. Lenis's anchor handling doesn't call `preventDefault`, so the browser moves focus to `<main>`.

## Homepage

The homepage starts with a Hero section from Sanity ([Pages and sections](pages-and-sections.md#hero)): "Fast, accessible websites." with "Clear, useful interfaces." in `muted`, a lead, and "Get in touch". The last section is a Posts section titled Writing: the two newest posts as cards with a `subtle` "See all posts" link ([Pages and sections](pages-and-sections.md#posts)), or "No posts yet." when there are none. The hero has no animation yet.

## Site footer

`frontend/src/features/site/site-footer/index.tsx` sits 10 lines below the content, in the same `site-container` as `<main>`. It is labelled by its `<h2>` "Connect"; below 800px everything stacks. From 800px it has three columns, 1.5rem apart:

- 12.6875rem: the "Connect" heading.
- The middle: a description list of contact links, each a `muted` label above a `plain` link with the handle: email, the profiles from `frontend/src/features/site/social-links.ts`, and the RSS feed.
- At the right, aligned right: the copyright line in `muted` (the year is taken at build time), with a `Privacy` link to `/privacy` on the line below. The privacy page is a Sanity page document; keep it published, or the link returns the 404.

Contact details live in code, not in Sanity: the footer and the contact page (`frontend/src/app/contact/page.tsx`) both read `social-links.ts`. The contact page has a visible `<h1>` "Get in touch", a lead, a `primary` "Send an email" button and a `subtle` LinkedIn button, then two sections: "Email and social" and "Elsewhere" (RSS, `llms.txt`, and the sitemap). Its metadata comes from `pageMetadata()`, and it is listed in the sitemap and `llms.txt`.

## Typography

- `frontend/src/app/layout.tsx` loads [Geist Sans](https://vercel.com/font) with `next/font/local` from `frontend/src/features/style/fonts/geist-latin.woff2` (26 KB, against 69 KB for the full variable font), exposed to Tailwind as `font-sans` and set on `<html>` in `typography.css`. The OG image reads the TTF files from the `geist` package, so that dependency stays.
- The file is a subset of `Geist-Variable.woff2` from the `geist` package: Basic Latin, Latin-1, Latin Extended-A, common punctuation, `€`, and the arrows `← → ↗`, with the `wght` axis limited to 400–700 (editors can use bold). Characters outside it fall back to the system font. Regenerate it with `fontTools` (`pip install fonttools brotli`): subset with `fontTools.subset` (`flavor="woff2"`, all layout features, `lazy=False` when loading), then `fontTools.varLib.instancer.instantiateVariableFont(font, {"wght": (400, 700)})`. It is the upright font only, so italic is synthesised, as before.
- Body text is 400 at 0.875rem (14px) with a unitless line height of 1.5715 (22px), so most hierarchy comes from colour (`foreground` against `muted`) and spacing.
- The homepage `<h1>` is 4rem (2.5rem below the `site` breakpoint) at weight 500. Page sections such as Experience, Projects, and Writing use `headingStyles.section`: 1.875rem (1.5rem on small screens) at 400.
- Articles, the contact page, and the 404 have a visible `<h1>` at 2.5rem (2rem on small screens) and weight 500. Article `<h2>` is 1.125rem and 500, `<h3>` 0.9375rem and 500. See [Posts](posts.md).
- `typography.css` turns on antialiasing, `optimizeLegibility`, and `text-size-adjust: 100%`.
- Spacing is set in `lh`, so it follows the line height. See [Pages and sections](pages-and-sections.md) for the page content model.

## Smooth scrolling

`frontend/src/features/lenis.tsx` mounts [Lenis](https://github.com/darkroomengineering/lenis) for the whole page from `frontend/src/app/layout.tsx`, the 404 page included. Its stylesheet is imported in `frontend/src/features/style/global.css`.

- `respectReducedMotion` turns smoothing off when the system asks for reduced motion.
- `anchors` makes in-page `#` links scroll smoothly too.

The page scrolls the document itself; don't put the content in its own scroll container, or Lenis has nothing to drive.
