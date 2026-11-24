# Frontend

The Next.js app lives in `frontend/`. These guides cover its routes, UI, metadata, and integration with Sanity. Paths in parentheses are relative to `frontend/src/`; read the guide before changing code there.

- [404 page](not-found.md) (`app/not-found.tsx`): not-found behavior and indexing.
- [Layout and typography](layout.md) (`app/layout.tsx`, `features/site/`, `features/style/`, `features/lenis.tsx`): the grid, header, footer, fonts, and smooth scrolling.
- [Pages and sections](pages-and-sections.md) (`app/[[...uri]]/`, `features/pages/`, `features/sections/`, `features/sanity/`): rendering Sanity pages and articles from sections.
- [Posts](posts.md) (`app/posts/`, `app/feed.xml/`, `features/posts/`): the index, article pages, and RSS feed.
- [Links and buttons](links-and-buttons.md) (`components/`, `features/sanity/link/`): the `Link` and `Button` components.
- [Color scheme](color-scheme.md) (`features/style/colors.css`): system light and dark mode.
- [SEO and structured data](seo-and-structured-data.md) (`features/*/metadata.ts`, `components/json-ld.tsx`, `app/sitemap.ts`, `app/robots.ts`, `app/manifest.ts`): metadata, JSON-LD, sitemap, and manifest.
- [llms.txt and Markdown](llms-txt.md) (`app/llms.txt/`, `app/llms-full.txt/`, `app/posts/[slug]/md/`, `features/sections/markdown.ts`): plain-text and Markdown versions of the site.
- [WebMCP](webmcp.md) (`features/site/webmcp.tsx`): tools for AI agents in the browser.
- [Browser automation](browser-automation.md): verifying the site in a browser.

For document schemas and Studio setup, see the [Studio guide](../studio/README.md). The [agent skills guide](../agent-skills.md) covers skills used in both workspaces.
