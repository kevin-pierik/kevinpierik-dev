# Links and buttons

`Link` and `Button` render every link and button on the site. Both use the ui-sdk `Button`. ui-sdk has no link component, and its documented way to make a link is `Button` with an `<a>` in `render`. The element stays a native link: no `role="button"`, and opening in a new tab still works. A disabled link can't navigate and leaves the tab order.

## Files

- `components/link.tsx`: `Link`, a client module. Server Components and MDX can render it.
- `components/button.tsx`: `Button` and `buttonClassName(variant, size)`.
- `mdx-components.tsx`: maps markdown links to `Link`.

## Link

An `href` that starts with `/` renders through Next.js `Link`, which keeps client-side navigation. Anything else, such as `https:`, `mailto:`, or `tel:`, renders a plain `<a>`. Extra anchor props, such as `target` or `rel`, are passed to the anchor.

`Link` builds its anchor in a render function for two reasons. A `render` element created in a Server Component reaches ui-sdk's client `Button` without a usable element type, and prerendering fails. The render function also lets `Link` drop the `type="button"` that ui-sdk adds, because `type` on an anchor is a MIME type.

Variants:

- `text` (default): the inline link from ui-sdk.dev. Its underline is `foreground` at 25%, with the font's own thickness and a 3px offset, and turns solid on hover and focus. The CV uses it.
- `nav`: no underline until hover, like the ui-sdk.dev navigation. Use it only inside a `<nav>`, where the position makes clear that it is a link. CV entries with a link use it.
- `primary`: the blue `primary` button look, for the main call to action.
- `button`: the solid button look, for other calls to action.
- `outline` and `subtle`: the button variants of the same name.

Button variants also take `size`. The social links in the [site header](layout.md) are `subtle` and `sm`.

## Button

The look follows ui-sdk.dev: square blocks. `size` is `md` (default, a minimum height of 2.5rem) or `sm` (2rem).

- `primary`: a blue `primary` fill with white text. On hover, it darkens to `primary-hover`.
- `solid` (default): a `foreground` fill with `background` text. On hover, the fill drops to 85%.
- `outline`: a 1px `foreground` border on `background`. On hover, it gets a 6% `foreground` tint.
- `subtle`: a 6% `foreground` tint that deepens to 12% on hover.

Disabled buttons are at 50% opacity, through ui-sdk's `data-disabled`. Nothing uses `Button` yet.

## Focus and colour

Links and buttons show a 2px blue `ring` outline, offset by 2px, on `:focus-visible`. Don't add `outline-none`: in Tailwind 4 it sets `--tw-outline-style: none`, which `outline-2` reads, so the outline disappears.

The colours come from the tokens in [Color scheme](color-scheme.md), which lists their contrast ratios. Text stays at 4.5:1 or more in both schemes, on the hover fills too.
