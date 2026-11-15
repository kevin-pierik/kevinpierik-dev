# 404 page

Unknown routes, including unknown first segments such as `/fr`, render a plain not-found page in the site's own style.

`app/global-not-found.tsx` holds the whole page. It uses the shared viewport and layout, without the site header, footer, and Lenis. It can't know the visitor's language, so it says the same thing in both site languages, each in `muted` text with a link to that language's homepage: English to `/`, Dutch (`lang="nl"`) to `/nl`. The lines sit at the top left, where the site header starts. The `<h1>` "Page not found" is `sr-only`.

The page is `noindex` and is not listed in `robots.txt`, `sitemap.xml`, or `llms.txt`.
