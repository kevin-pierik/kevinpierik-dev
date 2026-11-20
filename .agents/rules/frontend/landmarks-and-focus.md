---
name: frontend/landmarks-and-focus
rubric: accessibility
severity: blocking
paths:
  - "frontend/src/**/*.tsx"
  - "frontend/src/**/*.css"
---

# Landmarks, names, focus, and motion

**Rule.** Keep landmarks, accessible names, visible focus styles, semantic lists, native links, and the reduced-motion rules in `frontend/src/features/style/animations.css`.

## Look for

- Removed or duplicated `<header>`, `<nav>`, `<main>`, or `<footer>` landmarks, or a second `<nav>` without an `aria-label`.
- An icon-only button or link without an accessible name.
- `outline-none` or `focus:outline-none` without a `focus-visible` replacement in the `ring` colour. Reuse `focus` from `frontend/src/components/link.tsx`.
- A list of items rendered as `<div>`s instead of `<ul>` or `<ol>` with `<li>`.
- Navigation done with `onClick` and `router.push` on a `<div>` or `<button>` instead of a link.
- New animations or transitions that ignore `prefers-reduced-motion`, or changes that weaken the rules in `animations.css`.
- A removed or broken skip link.

## Do not flag

- `next/link` and the shared `link.tsx`; they render native `<a>` elements.
- `sr-only` text used to give a control its name.

## Why

Keyboard and screen-reader users depend on these, and they break silently because the page still looks right.

## Example

Bad:

```tsx
<button className="focus:outline-none" onClick={copy}>
  <CopyIcon />
</button>
```

Good:

```tsx
import { focus } from "@/components/link";

<button className={focus} onClick={copy}>
  <CopyIcon aria-hidden />
  <span className="sr-only">Copy code</span>
</button>;
```
