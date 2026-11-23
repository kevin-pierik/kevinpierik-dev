# 404 page

`frontend/src/app/not-found.tsx` shows when a page, an article, or another path doesn't exist, such as `/about` or `/posts/unknown`. As the root not-found file, it also handles every URL that matches no route. It renders inside the root layout with the site header and footer, an `<h1>` "Page not found" in the content column, and a muted line with a link to the homepage. The texts are hardcoded in the component.

It is `noindex` and is not listed in `robots.txt`, `sitemap.xml`, or `llms.txt`.
