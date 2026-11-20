# 404 page

There are two not-found pages.

- `frontend/src/app/(web)/not-found.tsx` shows when a page, an article, or another path doesn't exist, such as `/about` or `/posts/unknown`. It renders the site header and footer, an `<h1>` "Page not found" in the content column, and a muted line with a link to the homepage. The texts are hardcoded in the component.
- `frontend/src/app/global-not-found.tsx` covers broken routes outside the `(web)` route group. It uses the shared viewport and layout, without the site header, footer, and Lenis, and links to the homepage. Its `<h1>` is `sr-only`.

Both are `noindex` and are not listed in `robots.txt`, `sitemap.xml`, or `llms.txt`.
