# 404 page

`frontend/src/app/not-found.tsx` shows when a page, an article, or another path doesn't exist, such as `/about` or `/posts/unknown`. As the root not-found file, it also handles every URL that matches no route. It is deliberately bare: no site header or footer, only one muted line at the top left, in the same container as the header on other pages: "The page you’re looking for can’t be found. Return to homepage." A screen-reader-only `<h1>` "Page not found" labels `<main>`, and the page title is "Page not found". The texts are hardcoded in the component.

It is `noindex` and is not listed in `robots.txt`, `sitemap.xml`, or `llms.txt`.
