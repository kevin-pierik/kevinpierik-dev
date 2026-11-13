# Color scheme

The site follows the system light or dark mode unless the visitor picks one in the footer.

- `features/style/colors.css` defines `--background` and `--foreground` with `light-dark()`. Tailwind exposes them as `background` and `foreground`; use those instead of black or white.
- `--muted` is secondary text: `#6b6b6b` in light mode and `#9a9a9a` in dark mode, 5.3:1 and 7.5:1 against the page. Tailwind exposes it as `muted`.
- `--subtle` and `--subtle-hover` fill `subtle` buttons: `#f0f0f0` and `#e4e4e4` in light mode, `#262626` and `#333333` in dark mode, after ui-sdk.dev's `accent`. Text on them is 12.6:1 or more.
- The only accent is the blue from ui-sdk.dev, in three tokens. `primary`, `primary-hover`, and `primary-foreground` fill the `primary` button: white text on `#006bff` in light mode and `#2466c3` in dark mode, darker on hover. `ring` is the focus outline (`#006bff` and `#5fa1f3`). `--selection` is the text selection (`#cce1ff` and `#0b3d91`).
- `sharedViewport` in `app/shared-web-layout.tsx` declares `colorScheme: "light dark"` and a matching theme colour for each scheme.
- The `.light` and `.dark` classes on `<html>` force a scheme by setting `color-scheme`; every token follows through `light-dark()`. The BIOS 404 renders with `.dark`.
- The `::selection` background is `--selection` at 99% opacity, because WebKit blends opaque selection colours with white and renders them grey.

Text needs a contrast ratio of at least 4.5:1 in both schemes. White on each `primary` fill is 4.6:1 or more, and the `ring` and `primary` colours stand out at least 3:1 against the page.

## Theme switcher

`features/site/theme-switcher.tsx` is a ui-sdk segmented control with three options: System (monitor), Light (sun), and Dark (moon). It sits at the bottom right of the [site footer](layout.md#site-footer), and its labels come from the `theme` entry in the dictionaries.

- The choice is stored in `localStorage` under `theme`, never in a cookie, so every page stays static. System removes the key.
- `themeScript` in `features/site/theme.ts` runs inline in `<head>` before the first paint. It reads the stored theme, adds `.light` or `.dark` to `<html>`, and prepends its own `theme-color` meta, so a stored choice never flashes the system scheme. `<html>` has `suppressHydrationWarning` because the class differs from the server HTML.
- The switcher applies the same class and meta in a layout effect, which also restores them after React resets `<html>` on the Strict Mode remount in development.
- The forced `theme-color` meta is a separate element marked `data-theme`, with `#fff` or `#000` as its content. React adopts a server-rendered `<meta>` by `name` and `content` only, so a forced meta with the same `#ffffff` or `#000000` as the metas from `sharedViewport` would be taken for one of them, and removing it would crash React. Don't edit those two metas either: Next hydrates them after the switcher's effect, and React would insert duplicates.
- `SharedWebLayout` leaves the script out when `dark` is set, so the BIOS 404 always stays dark and has no switcher.
