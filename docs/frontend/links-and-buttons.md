# Links and buttons

The site has links only. Every one renders through Next.js `Link`, which turns into a native `<a>`, keeps client-side navigation for routes, and works for `https:`, `mailto:`, and `tel:` too. The one exception is the skip link (see [Layout](layout.md)).

Buttons use the ui-sdk `Button`. The only one so far is `CopyButton` in `frontend/src/components/copy-button.tsx`, the icon button on code blocks. It and the heading links share `useCopyState`: it writes to the clipboard, swaps the icon for a check or a cross for two seconds, and announces "Copied" or "Copy failed" in a `role="status"` region outside the button, following the Modern Web Guidance copy-button guide.

## Navigation

The header navigation is a ui-sdk `NavigationMenu`, following [its docs](https://ui-sdk.dev/docs/react/components/navigation-menu): `NavigationMenu` with an `aria-label` renders the `<nav>`, `NavigationMenuList` and `NavigationMenuItem` the list, and `NavigationMenuLink` each link. The link gets Next.js `Link` through `render={<NextLink href="…" />}`, as the docs show for a router's link, and `current` for the page you're on, which sets `aria-current="page"` and `data-current`. Items are plain links, so there is no trigger, content, or viewport.

## Other links

`frontend/src/components/link.tsx` is a thin `Link` around Next.js `Link` that adds a `variant` class, and a `muted` ↗ (hidden from screen readers) after links to `http:` or `https:` URLs. Links from Sanity render through `SanityLink` (`frontend/src/features/sanity/link/`), which only allows safe URLs. The classes are exported as `linkStyles`, so the navigation and the skip link use the same looks:

- `text` (default): the inline link from ui-sdk.dev. Its underline is `foreground` at 25%, with the font's own thickness and a 3px offset, and turns solid on hover and focus. The 404 page and markdown links use it.
- `nav`: no underline until hover, like the ui-sdk.dev navigation. Use it only where the position makes clear that it is a link, such as links in compact lists.
- `pill`: no underline; on hover a fully rounded `subtle` fill appears and the text turns `foreground`. The header navigation uses it, `muted` with the current page in `foreground` (`data-current`). The list has a negative right margin equal to the pill's padding, so the last item's text lines up with the page edge.
- `plain`: no hover style at all, only the focus outline. The name in the header and the footer links use it, because their position already says they are links.
- `subtle`: a small fully rounded block, at least 2rem high, with a `subtle` fill that darkens to `subtle-hover` on hover. These are solid colours, not a `foreground` tint, so the block stays visible in dark mode. The skip link uses it; it sits above the sticky header (`z-20`), so its blur doesn't cover it.

## Shape and touch targets

The site follows Apple's Human Interface Guidelines for shape and touch:

- Controls and pills are fully rounded (`rounded-full`). Blocks, such as post cards, images, videos, the carousel frame, code blocks, and tables, use `rounded-2xl`; inline code uses `rounded-md`.
- Corners inside a rounded block are concentric: the copy button sits 6px inside a 16px corner, so it uses a 10px radius.
- On touch screens (`pointer-coarse`) every control is at least 44px high: header pills, the copy button, "Read more", and the newsletter field, clear button, and Subscribe button.
- Icon buttons have no hover fill. The copy button only turns its icon from `muted` to `foreground`.

## Focus and colour

Links show a 2px blue `ring` outline, offset by 2px, on `:focus-visible`. Don't add `outline-none`: in Tailwind 4 it sets `--tw-outline-style: none`, which `outline-2` reads, so the outline disappears.

The colours come from the tokens in [Color scheme](color-scheme.md), which lists their contrast ratios. Text stays at 4.5:1 or more in both schemes, on the hover fill too.
