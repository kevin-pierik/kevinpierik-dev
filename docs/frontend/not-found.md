# 404 page

There are two not-found pages.

- `frontend/src/app/(web)/[locale]/not-found.tsx` shows when a page, an article, or another path inside a language doesn't exist, such as `/about` or `/nl/posts/onbekend`. It renders the site header and footer, an `<h1>` "Page not found" in the content column, and a muted line with a link to that language's homepage. The texts are `notFoundTitle`, `notFoundText`, and `notFoundLink` in the dictionaries.
- `frontend/src/app/global-not-found.tsx` covers what can't be matched to a language, such as a broken route outside `[locale]`. It uses the shared viewport and layout, without the site header, footer, and Lenis, and says the same thing in both languages, each with a link to that language's homepage. Its `<h1>` is `sr-only`.

Both are `noindex` and are not listed in `robots.txt`, `sitemap.xml`, or `llms.txt`.
