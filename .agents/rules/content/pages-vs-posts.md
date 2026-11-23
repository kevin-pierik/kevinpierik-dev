---
name: content/pages-vs-posts
rubric: correctness
severity: blocking
paths:
  - "studio/schemas/**"
  - "studio/structure.tsx"
  - "frontend/src/features/sanity/**"
  - "frontend/src/features/pages/**"
  - "frontend/src/features/posts/**"
  - "frontend/src/features/sections/**"
  - "frontend/src/app/**/page.tsx"
---

# Pages and articles share one section model

**Rule.** Sanity `page` and `article` are separate document types that build their content from the same `sections` page builder (`studio/schemas/fields/create-sections.ts`). Keep section types, their GROQ projection, and their renderer in one place, and keep routes and metadata aligned.

## Look for

- A section type defined inline in `page.ts` or `article.ts` instead of in `create-sections.ts`.
- A section type added to the schema without the matching projection in `frontend/src/features/sections/fragment.ts` and a `case` in `frontend/src/features/sections/index.tsx`.
- A second renderer or query fragment for sections, such as a page-only switch, instead of the shared one.
- A section that wraps its output in its own grid or container, so the page or article grid can no longer place it.
- A new route under `frontend/src/app/` that duplicates what `[[...uri]]` already renders from a `page` document.
- `[[...uri]]` rendering `/posts`, which `frontend/src/app/posts/page.tsx` renders with the article list.
- A GROQ query that fetches drafts, or misses the projection fields the route uses, without running `bun run typegen`.
- Generated content, such as the article list, moved into sections, or editor content hardcoded in a route.

## Do not flag

- Section types that only one document type allows through `createSections([...])`, such as code and tables for articles.
- Interface text (skip link, 404 copy, copy-button labels) hardcoded in components; that is intended.
- Fields that only exist on articles, such as publish dates and description.

## Why

One section model keeps the Studio, rendering, and reading time consistent across pages and articles. See [Pages and sections](../../../docs/frontend/pages-and-sections.md) and [Posts](../../../docs/frontend/posts.md).

## Example

Bad:

```ts
// page.ts
defineField({
  name: "sections",
  type: "array",
  of: [{ type: "object", name: "hero", fields: [/* … */] }],
});
```

Good: define `heroSection` in `create-sections.ts`, add it with `createSections([...])`, project it in `fragment.ts`, and render it in `frontend/src/features/sections/`.
