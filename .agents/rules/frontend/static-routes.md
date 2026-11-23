---
name: frontend/static-routes
rubric: correctness
severity: blocking
paths:
  - "frontend/src/app/**"
  - "frontend/src/features/**/fetch.ts"
  - "frontend/src/features/sanity/**"
  - "frontend/next.config.ts"
---

# Every route stays static

**Rule.** Every frontend route builds as `○` (static) or `●` (prerendered Sanity page). Route handlers export `dynamic = "force-static"`.

## Look for

- A route that shows as `ƒ` (dynamic) in the `bun run build` output.
- `cookies()`, `headers()`, `draftMode()`, `connection()`, or `searchParams` in a page, layout, or `generateMetadata`.
- A new `route.ts` under `frontend/src/app/` without `export const dynamic = "force-static"`.
- A dynamic segment such as `[slug]` without `generateStaticParams`, or with `dynamicParams` turned on for content that isn't in Sanity yet.
- A `fetch` or Sanity query with `cache: "no-store"`, or `revalidate = 0`.

## Do not flag

- Client-side interaction in a `"use client"` component; it runs after the static HTML loads.
- `client.fetch` from `frontend/src/features/sanity/client.ts`; it is configured without a token and prerenders.
- `generateStaticParams` returning an empty list while there is no content yet, as long as the build output stays `●`.

## Why

The site is served entirely from the CDN, with no server rendering cost and no runtime failures. One dynamic API in a shared layout makes every route below it dynamic.

## Example

Bad:

```ts
export async function GET() {
  return new Response(await buildFeed());
}
```

Good:

```ts
export const dynamic = "force-static";

export async function GET() {
  return new Response(await buildFeed());
}
```
