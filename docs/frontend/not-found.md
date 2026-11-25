# 404 page

`frontend/src/app/not-found.tsx` shows when a page, an article, or another path doesn't exist, such as `/about` or `/posts/unknown`. As the root not-found file, it also handles every URL that matches no route. It has the site header and footer, like every other page, and a centred block in the middle of a 35rem tall `<main>`: a visible `<h1>` "Page not found" that labels `<main>`, the line "The page you’re looking for can’t be found.", and links to the homepage and the sitemap. The page title is "Page not found". The texts are hardcoded in the component.

It is `noindex` and is not listed in `robots.txt`, `sitemap.xml`, or `llms.txt`.
