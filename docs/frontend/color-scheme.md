# Color scheme

The site follows the system light or dark mode. There is no toggle.

- `frontend/src/features/style/colors.css` defines `--background` and `--foreground` with `light-dark()`. Tailwind exposes them as `background` and `foreground`; use those instead of black or white.
- `--muted` is secondary text: `#6b6b6b` in light mode and `#9a9a9a` in dark mode, 5.3:1 and 7.5:1 against the page. Tailwind exposes it as `muted`.
- `--subtle` and `--subtle-hover` fill `subtle` buttons: `#f0f0f0` and `#e4e4e4` in light mode, `#262626` and `#333333` in dark mode, after ui-sdk.dev's `accent`. Text on them is 12.6:1 or more.
- The only accent is the blue from ui-sdk.dev. `ring` is the focus outline (`#006bff` and `#5fa1f3`), and `--selection` is the text selection (`#cce1ff` and `#0b3d91`).
- `sharedViewport` in `frontend/src/app/shared-web-layout.tsx` declares `colorScheme: "light dark"` and a matching theme colour for each scheme.
- The `.dark` class forces the dark scheme. No page uses it at the moment.
- The `::selection` background is `--selection` at 99% opacity, because WebKit blends opaque selection colours with white and renders them grey.

Text needs a contrast ratio of at least 4.5:1 in both schemes. The `ring` colour stands out at least 3:1 against the page.
