---
name: frontend/server-components-default
rubric: correctness
severity: advisory
paths:
  - "frontend/src/**/*.tsx"
---

# Server Components by default, few components

**Rule.** Components are Server Components unless they need real client-side interaction. Hardcode content where it is used, and extract a component only for real behaviour or reuse.

## Look for

- `"use client"` on a component that has no state, effect, event handler, or browser API.
- `"use client"` high in the tree, such as on a layout or a page, when only a small child is interactive.
- A new component used once that only wraps markup or passes props through.
- Interface text moved into constants, props, or Sanity when it is only used in one component.
- Relative imports across folders instead of `@/*` in `frontend/` or `@studio/*` for shared Studio helpers.

## Do not flag

- Small client islands such as `copy-button.tsx` or `lenis.tsx`.
- A component extracted because two or more places render it.
- Content that editors manage in Sanity, such as page bodies and settings.

## Why

Every client component adds JavaScript to the page. Extra components and indirection make a small site harder to read than the markup they replace.

## Example

Bad:

```tsx
"use client";

export function Intro() {
  return <p>Frontend developer in Amsterdam.</p>;
}
```

Good: write the `<p>` where it is used, as a Server Component.
