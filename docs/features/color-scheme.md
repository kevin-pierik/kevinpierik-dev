# Color scheme

The site follows the system light or dark mode. There is no toggle.

- `features/style/colors.css` defines `--background` and `--foreground` with `light-dark()`. Tailwind exposes them as `background` and `foreground`; use those instead of black or white.
- `sharedViewport` in `app/shared-web-layout.tsx` declares `colorScheme: "light dark"` and a matching theme colour for each scheme.
- The `.dark` class forces the dark scheme. Only the BIOS 404 uses it.
- The `::selection` background is the foreground colour at 99% opacity, because WebKit blends opaque selection colours with white and renders them grey.

Text needs a contrast ratio of at least 4.5:1 in both schemes.
