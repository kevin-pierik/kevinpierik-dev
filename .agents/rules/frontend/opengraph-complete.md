---
name: frontend/opengraph-complete
rubric: seo
severity: blocking
paths:
  - "frontend/src/**/metadata.ts"
  - "frontend/src/app/**/layout.tsx"
  - "frontend/src/app/**/page.tsx"
---

# Declare the complete Open Graph object

**Rule.** Next.js merges `openGraph` (and `twitter`) shallowly, so every `generateMetadata` that sets `openGraph` declares the complete object.

## Look for

- A page or post that sets `openGraph: { title, description }` and relies on the layout for `siteName`, `locale`, `url`, or `type`.
- A new metadata builder that doesn't go through `pageMetadata()` in `frontend/src/features/pages/metadata.ts` or the posts metadata in `frontend/src/features/posts/metadata.ts`.
- `images` declared in metadata; `opengraph-image.tsx` adds them.

## Do not flag

- Metadata that doesn't set `openGraph` at all and inherits the layout's object unchanged.

## Why

A partial object replaces the parent's, so `og:site_name` and `og:locale` disappear without any error. See [SEO](../../../docs/frontend/seo-and-structured-data.md).

## Example

Bad:

```ts
openGraph: { title, description },
```

Good:

```ts
openGraph: {
  type: "website",
  url,
  siteName: name,
  locale: "en_US",
  title,
  description,
},
```
