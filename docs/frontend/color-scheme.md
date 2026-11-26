# Color scheme

The site follows the system light or dark mode until the visitor picks one with the toggle at the bottom right of the footer.

- `frontend/src/features/site/site-footer/theme-toggle.tsx` is a ui-sdk `Toggle` named "Dark mode", pressed in dark mode. It shows Material Symbols' `dark_mode` (moon) in light mode and `light_mode` (sun) in dark mode, swapped with the `dark:` variant, so the right icon shows before hydration. Pressing it sets `data-theme="light"` or `"dark"` on `<html>` and stores the choice in `localStorage` under `theme`. There is no way back to "follow the system" except clearing it.
- An inline script at the top of `<head>` in `frontend/src/app/layout.tsx` applies the stored choice before the first paint, so the page doesn't flash the other scheme. `<html>` has `suppressHydrationWarning` because the script changes it before React hydrates.
- `colors.css` sets `color-scheme: light` or `dark` on `:root[data-theme]`. Every colour uses `light-dark()`, and Shiki's code colours do too, so that one property switches them all.
- `tailwind.css` redefines the `dark:` variant to match `[data-theme="dark"]`, or the system dark mode when no theme is set.
- The theme colour (`viewport.themeColor`) and the favicon still follow the system scheme.

- `frontend/src/features/style/colors.css` defines `--background` and `--foreground` with `light-dark()`. Tailwind exposes them as `background` and `foreground`; use those instead of black or white.
- `--muted` is secondary text: `#6b6b6b` in light mode and `#9a9a9a` in dark mode, 5.3:1 and 7.5:1 against the page. Tailwind exposes it as `muted`.
- `--subtle` and `--subtle-hover` fill `subtle` buttons: `#f0f0f0` and `#e4e4e4` in light mode, `#262626` and `#333333` in dark mode, after ui-sdk.dev's `accent`. Text on them is 12.6:1 or more.
- The only accent is `--focus`, the focus outline: `#1a7aff` (ui-sdk.dev's blue `#006bff` mixed with 10% white) and `#5fa1f3`. It is opaque, so its contrast doesn't depend on what is behind it: 4.0:1, 3.5:1, and 3.1:1 against the page, `subtle`, and `subtle-hover` in light mode, and 7.9:1, 5.7:1, and 4.7:1 in dark mode. `--selection` is the text selection (`#cce1ff` and `#0b3d91`).
- The `viewport` export in `frontend/src/app/layout.tsx` declares `colorScheme: "light dark"` and a matching theme colour for each scheme.
- The `::selection` background is `--selection` at 99% opacity, because WebKit blends opaque selection colours with white and renders them grey.

Text needs a contrast ratio of at least 4.5:1 in both schemes. The `focus` outline stands out at least 3:1 against the page and the `subtle` and `subtle-hover` fills (WCAG 1.4.11).
