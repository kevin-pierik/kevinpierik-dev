# Links and buttons

The site has links only. Every one renders through Next.js `Link`, which turns into a native `<a>`, keeps client-side navigation for routes, and works for `https:`, `mailto:`, and `tel:` too. The one exception is the skip link (see [Layout](layout.md)).

The site has no buttons yet. Add one with the ui-sdk `Button` when there is one to render.

## Navigation

The header navigation and the footer's language switcher are ui-sdk `NavigationMenu`s, following [its docs](https://ui-sdk.dev/docs/react/components/navigation-menu): `NavigationMenu` with an `aria-label` renders the `<nav>`, `NavigationMenuList` and `NavigationMenuItem` the list, and `NavigationMenuLink` each link. The link gets Next.js `Link` through `render={<NextLink href="…" />}`, as the docs show for a router's link, and `current` for the page you're on, which sets `aria-current="page"` and `data-current`. Items are plain links, so there is no trigger, content, or viewport.

## Other links

`components/link.tsx` is a thin `Link` around Next.js `Link` that adds a `variant` class. `mdx-components.tsx` maps markdown links to it. The classes are exported as `linkStyles`, so the navigation and the skip link use the same looks:

- `text` (default): the inline link from ui-sdk.dev. Its underline is `foreground` at 25%, with the font's own thickness and a 3px offset, and turns solid on hover and focus. The 404 page and markdown links use it.
- `nav`: no underline until hover, like the ui-sdk.dev navigation. Use it only where the position makes clear that it is a link: the language switcher and the company names in CV entries.
- `subtle`: a small square block, at least 2rem high, with a `subtle` fill that darkens to `subtle-hover` on hover. These are solid colours, not a `foreground` tint, so the block stays visible in dark mode. The header navigation and the skip link use it.

## Focus and colour

Links show a 2px blue `ring` outline, offset by 2px, on `:focus-visible`. Don't add `outline-none`: in Tailwind 4 it sets `--tw-outline-style: none`, which `outline-2` reads, so the outline disappears.

The colours come from the tokens in [Color scheme](color-scheme.md), which lists their contrast ratios. Text stays at 4.5:1 or more in both schemes, on the hover fill too.
