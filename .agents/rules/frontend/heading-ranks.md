---
name: frontend/heading-ranks
rubric: accessibility
severity: blocking
paths:
  - "frontend/src/**/*.tsx"
  - "studio/schemas/fields/create-rich-text.ts"
---

# Heading ranks

**Rule.** Every page has one `<h1>`. Page sections use `<h2>` and entries within them `<h3>`. Never skip a rank or add deeper headings without real subsections.

## Look for

- A second `<h1>` on a page. The site header provides the homepage `<h1>`; other pages use a screen-reader-only `<h1>` from the Sanity page title.
- A heading chosen for its size, such as an `<h4>` directly under an `<h2>`.
- Text styled as a heading (`<p className="text-2xl font-bold">`) that structures the page but isn't a heading element.
- A Portable Text style that allows `h1` in a Body, or a renderer that maps Body headings to a different rank.
- Article cards in a list that use a heading rank that doesn't follow the list's section heading.

## Do not flag

- Visual size that differs from the rank; style with classes and keep the rank correct.
- `global-not-found.tsx`, whose only `<h1>` is `sr-only`.

## Why

Screen-reader users navigate by headings, and search engines read the outline. See [Pages and Body](../../../docs/frontend/pages-and-sections.md).

## Example

Bad:

```tsx
<h2>Posts</h2>
<h4>{article.title}</h4>
```

Good:

```tsx
<h2>Posts</h2>
<h3>{article.title}</h3>
```
