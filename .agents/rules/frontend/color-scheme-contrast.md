---
name: frontend/color-scheme-contrast
rubric: accessibility
severity: blocking
paths:
  - "frontend/src/**/*.tsx"
  - "frontend/src/**/*.css"
---

# Theme colours and contrast

**Rule.** Use the theme colours (`background`, `foreground`, `muted`, `subtle`, `ring`), never hardcoded black or white, and keep text contrast at 4.5:1 or more in both the light and dark scheme. Global styles are imported only through `frontend/src/app/layout.tsx`.

## Look for

- Tailwind classes such as `bg-white`, `text-black`, `bg-neutral-*`, or arbitrary values like `text-[#333]`.
- Hex, `rgb()`, or named colours in CSS outside `frontend/src/features/style/colors.css`.
- A new colour token defined for only one scheme, or without a contrast check against the page in both schemes.
- Opacity on text (`text-foreground/50`) that drops below 4.5:1.
- A CSS import in a page, layout, or component other than `app/layout.tsx`.

## Do not flag

- The Open Graph image in `opengraph-image.tsx`, which renders on a fixed white background outside the page.
- Decorative borders and dividers, which need 3:1 only when they convey meaning.

## Why

The site follows the system scheme with no toggle, so every colour must work in both. See [color scheme](../../../docs/frontend/color-scheme.md).

## Example

Bad:

```tsx
<p className="text-gray-400">Published 3 March</p>
```

Good:

```tsx
<p className="text-muted">Published 3 March</p>
```
