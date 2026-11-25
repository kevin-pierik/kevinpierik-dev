# Posts

Posts live at `/posts`. Articles are written in [Sanity](https://www.sanity.io) and fetched by the Next.js app, following Sanity's [Next.js guide](https://www.sanity.io/docs/nextjs).

## Writing a post

The Studio is a separate workspace in `studio/`. Run it with `bun run dev:studio` at <http://localhost:3333>, or deploy it to Sanity hosting with `bun --filter studio deploy`. Its schemas live in `schemas/documents/` and `schemas/fields/`, with `structure.tsx` and `slug.ts` configuring the Studio.

An article (`article`) has a title, a slug, a description (the excerpt on the index and the fallback meta description), optional SEO title and description overrides, a publish date, an optional update date, a `Show in posts overview` switch, and sections, in the tabs **Post**, **Content**, and **SEO**. Turn the switch off to publish an article at its URL without listing it on `/posts`. Articles allow every section type ([Pages and sections](pages-and-sections.md#sections)):

- Text: paragraphs, `h2` and `h3` headings, quotes, bulleted and numbered lists, links, and inline code.
- Media: an image with alt text or a Mux video, an optional caption, and `wide`, which reaches one column further on each side.
- Code (`@sanity/code-input`), highlighted with Shiki in GitHub's light and dark themes, with line numbers and a copy button.
- Table (`@sanity/table`). The first row is the header, and the table scrolls sideways in a labelled region when it is too wide.
- Carousel: a row of images or videos with titles and descriptions that runs to the edge of the screen.

Articles are written in English. Sanity keeps unpublished changes as drafts; the site only shows published posts.

## How it works

- `frontend/src/features/sanity/` holds the client and the image URL helper. The client reads only published content from the Sanity CDN, without a token, and the fetch helpers call `client.fetch` directly. Next.js stores fetches made during `next build` in its data cache and reuses them in the next build when the request URL is the same, so an unchanged query (such as the page list or the navigation) would keep returning old content. The client therefore sets `requestTagPrefix` to `build.` plus `VERCEL_DEPLOYMENT_ID` (a timestamp locally), which adds a `tag` to every request URL and gives each deploy its own cache entries. There is no `<SanityLive />`, so visitors load no Sanity JavaScript and keep no connection open. Instead, publishing in Sanity triggers a new deploy ([Deployment](../deployment.md#publishing-content)).
- `frontend/src/features/posts/query.ts` and `frontend/src/features/pages/query.ts` hold the GROQ queries, written with `defineQuery`, with shared fragments such as `frontend/src/features/sanity/media/fragment.ts` (imported relatively, because TypeGen runs from `studio/` and doesn't know the `@/` alias). `bun run typegen` extracts the schema to `studio/schema.json` and writes `frontend/src/features/sanity/sanity.types.ts`. Run it after changing the schema or a query, and commit both files.
- `frontend/src/features/sections/` renders the sections, using `CodeBlock`, `Figure` with `Media`, `Table`, and the carousel; text sections use the Portable Text renderer in `frontend/src/features/sanity/rich-text/` with `HeadingLink`. Headings, including the titles of list and carousel sections, get an id from their text and copy a link to themselves when clicked.
- `next/image` uses a custom loader (`frontend/src/features/sanity/media/image-loader.ts`, set as `images.loaderFile` in `frontend/next.config.ts`). It adds `w`, `q`, `fit=max`, and `auto=format` to the Sanity CDN URL, which keeps the crop that `imageProps()` puts in the URL. The Sanity CDN resizes the images, so Vercel Image Optimization is never used. Only Sanity images go through `next/image`.
- Reading time counts the words of the text sections (`pt::text(sections[_type == "textSection"].body[])`) at 200 words a minute.

## Pages

- **Index** (`frontend/src/app/posts/page.tsx`, with `ArticleList` in `frontend/src/features/posts/`): the `/posts` page document provides the title, SEO fields, and sections: a small, left-aligned Hero with the title and intro, then a Posts section in three columns with every listed article, or "No posts yet." when there are none ([Pages and sections](pages-and-sections.md#posts)). `/feed.xml` reads its channel title and description from this page, so keep it published. The list is ordered newest first, with one card per listed article: a rounded `subtle` block with the date and reading time in `muted`, the title as an `<h3>` (`<h2>` when the Posts section has no heading), the description, and a "Read more" link with an arrow icon. The link is the only link in the card; a screen-reader-only suffix adds the title to its name, so every link is unique. The arrow moves 2px on hover. Cards have no cover. The homepage shows the two newest as cards side by side, through a Posts section in Grid layout ([Layout](layout.md#homepage)). `getArticles()` fetches the plain text of each listed article to compute its reading time, then drops the text, so the WebMCP tools don't send it to the browser.
- **Article** (`frontend/src/app/posts/[slug]/page.tsx`): a centred header with the title and a `muted` line with the author, date, reading time, the update date when there is one, and a link to the RSS feed. Then the sections, with the text at most 41.125rem wide ([Layout](layout.md#columns)), and a small `subtle` call to action, "Working on something similar? I’d love to hear about it.", with a `primary` link to the contact page. There is no back link and no previous or next post; the header navigation leads back to `/posts`.

`getArticle()` calls `notFound()` for an unknown slug, which shows the [404 page](not-found.md). The route sets `dynamicParams = true`, so an article published after the build renders on its first request instead of returning a 404.

## Feed

`frontend/src/app/feed.xml/route.ts` serves an RSS 2.0 feed of every published article. Every page links to it with `<link rel="alternate" type="application/rss+xml">` in the `<head>` of `frontend/src/app/layout.tsx`, so feed readers find it from any URL. It is a plain `<link>` instead of `alternates.types` in the metadata, because Next.js merges metadata shallowly and every page sets its own `alternates` for the canonical URL.

## SEO

See [SEO and structured data](seo-and-structured-data.md#posts). The sitemap and [`llms.txt`](llms-txt.md) list every published post.

## Setting up

The Sanity project is `v3zmx1mq` with the `production` dataset. The frontend needs `NEXT_PUBLIC_SANITY_PROJECT_ID` and `NEXT_PUBLIC_SANITY_DATASET` ([Deployment](../deployment.md)), and the site's origins (`http://localhost:3000` and `https://www.kevinpierik.dev`) in the project's CORS origins, added with `bunx sanity cors add <origin> --credentials` from `studio/`.
