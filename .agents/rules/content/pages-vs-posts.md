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
  - "frontend/src/app/**/page.tsx"
---

# Pages and articles stay separate

**Rule.** Sanity `page` and `article` are separate document types, each with one direct Portable Text `body`. Keep their routes, body content, and metadata aligned.

## Look for

- A page builder, section array, or block-type union added to `page` or `article` instead of the direct `body` field.
- A field added to one type's body (a new block, mark, or style) without the matching change in the shared renderer in `frontend/src/features/sanity/rich-text/`, or in `create-rich-text.ts` for the other type.
- A new route under `frontend/src/app/` that duplicates what `[[...uri]]` already renders from a `page` document.
- `[[...uri]]` rendering `/posts`, which `frontend/src/app/posts/page.tsx` renders with the article list.
- A GROQ query that fetches drafts, or misses the projection fields the route uses, without running `bun run typegen`.
- Generated content, such as the article list, moved into Body, or editor content hardcoded in a route.

## Do not flag

- Interface text (skip link, 404 copy, copy-button labels) hardcoded in components; that is intended.
- Fields that only exist on articles, such as publish dates and description.

## Why

One body model keeps rendering, search, `llms.txt`, and the feed consistent. See [Pages and Body](../../../docs/frontend/pages-and-sections.md) and [Posts](../../../docs/frontend/posts.md).

## Example

Bad:

```ts
defineField({
  name: "sections",
  type: "array",
  of: [{ type: "hero" }, { type: "textSection" }],
});
```

Good: add a block type to `create-rich-text.ts` and render it in the shared Portable Text components.
