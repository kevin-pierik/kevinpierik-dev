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

- `frontend/src/features/sanity/` holds the client and the image URL helper. The client reads only published content from the Sanity CDN, without a token, and the fetch helpers call `client.fetch` directly. There is no `<SanityLive />`, so visitors load no Sanity JavaScript and keep no connection open. Instead, publishing in Sanity triggers a new deploy ([Deployment](../deployment.md#publishing-content)).
- `frontend/src/features/posts/query.ts` and `frontend/src/features/pages/query.ts` hold the GROQ queries, written with `defineQuery`, with shared fragments such as `frontend/src/features/sanity/media/fragment.ts` (imported relatively, because TypeGen runs from `studio/` and doesn't know the `@/` alias). `bun run typegen` extracts the schema to `studio/schema.json` and writes `frontend/src/features/sanity/sanity.types.ts`. Run it after changing the schema or a query, and commit both files.
- `frontend/src/features/sections/` renders the sections, using `CodeBlock`, `Figure` with `Media`, `Table`, and the carousel; text sections use the Portable Text renderer in `frontend/src/features/sanity/rich-text/` with `HeadingLink`. Headings get an id from their text and copy a link to themselves when clicked.
- `next/image` uses a custom loader (`frontend/src/features/sanity/media/image-loader.ts`, set as `images.loaderFile` in `frontend/next.config.ts`). It adds `w`, `q`, `fit=max`, and `auto=format` to the Sanity CDN URL, which keeps the crop that `imageProps()` puts in the URL. The Sanity CDN resizes the images, so Vercel Image Optimization is never used. Only Sanity images go through `next/image`.
- Reading time counts the words of the text sections (`pt::text(sections[_type == "textSection"].body[])`) at 200 words a minute.

## Pages

- **Index** (`frontend/src/app/posts/page.tsx`, with `ArticleList` in `frontend/src/features/posts/`): the `/posts` page document provides the title, SEO fields, and sections (heading and intro); the list of listed articles follows below it, or "No posts yet." when there are none. `/feed.xml` reads its channel title and description from this page, so keep it published. The list is ordered newest first, with one row per listed article: date in a `<time>`, linked title and description. Rows sit one line apart. The index shows no covers. Below 800px the parts stack.
- **Article** (`frontend/src/app/posts/[slug]/page.tsx`): a back link, the title, the date and reading time, the sections, and links to the previous and next post. The text is centred in columns 4–9 ([Layout](layout.md#grid)).

`getArticle()` calls `notFound()` for an unknown slug, which shows the [404 page](not-found.md). The route sets `dynamicParams = true`, so an article published after the build renders on its first request instead of returning a 404.

## Feed

`frontend/src/app/feed.xml/route.ts` serves an RSS 2.0 feed of every published article. Every page links to it with `<link rel="alternate" type="application/rss+xml">` in the `<head>` of `frontend/src/app/layout.tsx`, so feed readers find it from any URL. It is a plain `<link>` instead of `alternates.types` in the metadata, because Next.js merges metadata shallowly and every page sets its own `alternates` for the canonical URL.

## SEO

See [SEO and structured data](seo-and-structured-data.md#posts). The sitemap and [`llms.txt`](llms-txt.md) list every published post.

## Setting up

The Sanity project is `v3zmx1mq` with the `production` dataset. The frontend needs `NEXT_PUBLIC_SANITY_PROJECT_ID` and `NEXT_PUBLIC_SANITY_DATASET` ([Deployment](../deployment.md)), and the site's origins (`http://localhost:3000` and `https://www.kevinpierik.dev`) in the project's CORS origins, added with `bunx sanity cors add <origin> --credentials` from `studio/`.
