# Links and buttons

`Link` and `Button` render every link and button on the site. Both use the ui-sdk `Button`. ui-sdk has no link component, and its documented way to make a link is `Button` with an `<a>` in `render`. The element stays a native link: no `role="button"`, and opening in a new tab still works. A disabled link can't navigate and leaves the tab order.

## Files

- `components/link.tsx`: `Link`, a client module. Server Components and MDX can render it.
- `components/button.tsx`: `Button` and `buttonClassName(variant)`.
- `mdx-components.tsx`: maps markdown links to `Link`.

## Link

An `href` that starts with `/` renders through Next.js `Link`, which keeps client-side navigation. Anything else, such as `https:`, `mailto:`, or `tel:`, renders a plain `<a>`. Extra anchor props, such as `target` or `rel`, are passed to the anchor.

`Link` builds its anchor in a render function for two reasons. A `render` element created in a Server Component reaches ui-sdk's client `Button` without a usable element type, and prerendering fails. The render function also lets `Link` drop the `type="button"` that ui-sdk adds, because `type` on an anchor is a MIME type.

Variants:

- `text` (default): an inline link with a 35% underline that becomes solid on hover and focus. The CV and the header use it.
- `button`: the solid button look, for calls to action.

## Button

The look follows ui-sdk.dev: square, monochrome blocks with a minimum height of 2.5rem.

- `solid` (default): a `foreground` fill with `background` text. On hover, the fill drops to 85%.
- `outline`: a 1px `foreground` border on `background`. On hover, it gets a 6% `foreground` tint.

Disabled buttons are at 50% opacity, through ui-sdk's `data-disabled`. Nothing uses `Button` yet.

## Focus and colour

Links and buttons show a 2px `foreground` outline, offset by 2px, on `:focus-visible`. Don't add `outline-none`: in Tailwind 4 it sets `--tw-outline-style: none`, which `outline-2` reads, so the outline disappears.

Only the `background` and `foreground` colours are used, so text contrast stays far above 4.5:1 in both schemes, including the 85% hover fill.
