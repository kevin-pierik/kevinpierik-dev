---
name: content/canonical-discovery
rubric: seo
severity: blocking
paths:
  - "frontend/src/app/sitemap.ts"
  - "frontend/src/app/robots.ts"
  - "frontend/src/app/llms.txt/**"
  - "frontend/src/app/feed.xml/**"
  - "frontend/src/app/**/*not-found.tsx"
---

# Discovery files list only canonical public content

**Rule.** `robots.txt`, `sitemap.xml`, `llms.txt`, and `feed.xml` list only canonical public content. `/api/` stays disallowed, and the 404 pages stay `noindex`.

## Look for

- A sitemap, `llms.txt`, or feed entry whose URL differs from the page's canonical, such as a trailing slash, `http`, or a missing `www`.
- Drafts, unpublished documents, or the 404 page in any of these files.
- A change to `robots.ts` that removes the `/api/` disallow or the sitemap link.
- `robots: { index: true }`, or a removed `noindex`, in `not-found.tsx` or `global-not-found.tsx`.
- A new public route that is missing from the sitemap and `llms.txt`.

## Do not flag

- The homepage URL written as the site URL without a path.
- Routes that aren't pages, such as `/manifest.webmanifest` or `/opengraph-image`.

## Why

Crawlers trust these files. A duplicate or non-canonical URL splits ranking signals, and an indexed 404 looks like thin content. See [SEO](../../../docs/frontend/seo-and-structured-data.md), [llms.txt](../../../docs/frontend/llms-txt.md), and [404 page](../../../docs/frontend/not-found.md).

## Example

Bad:

```ts
{
  url: `${siteUrl}/posts/${article.slug}/`;
}
```

Good:

```ts
{ url: absolute(postsPath(article.slug)), lastModified: article.updatedAt ?? article.publishedAt }
```
