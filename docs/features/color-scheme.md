# Color scheme

The site follows the system light or dark mode. There is no toggle.

- `features/style/colors.css` defines `--background` and `--foreground` with `light-dark()`. Tailwind exposes them as `background` and `foreground`; use those instead of black or white.
- `--muted` is secondary text: `#6b6b6b` in light mode and `#9a9a9a` in dark mode, 5.3:1 and 7.5:1 against the page. Tailwind exposes it as `muted`.
- `--subtle` and `--subtle-hover` fill `subtle` buttons: `#f0f0f0` and `#e4e4e4` in light mode, `#262626` and `#333333` in dark mode, after ui-sdk.dev's `accent`. Text on them is 12.6:1 or more.
- The only accent is the blue from ui-sdk.dev, in three tokens. `primary`, `primary-hover`, and `primary-foreground` fill the `primary` button: white text on `#006bff` in light mode and `#2466c3` in dark mode, darker on hover. `ring` is the focus outline (`#006bff` and `#5fa1f3`). `--selection` is the text selection (`#cce1ff` and `#0b3d91`).
- `sharedViewport` in `app/shared-web-layout.tsx` declares `colorScheme: "light dark"` and a matching theme colour for each scheme.
- The `.dark` class forces the dark scheme. Only the BIOS 404 uses it.
- The `::selection` background is `--selection` at 99% opacity, because WebKit blends opaque selection colours with white and renders them grey.

Text needs a contrast ratio of at least 4.5:1 in both schemes. White on each `primary` fill is 4.6:1 or more, and the `ring` and `primary` colours stand out at least 3:1 against the page.
