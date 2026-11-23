# Posts

Posts live at `/posts`. Articles are written in [Sanity](https://www.sanity.io) and fetched by the Next.js app, following Sanity's [Next.js guide](https://www.sanity.io/docs/nextjs).

## Writing a post

The Studio is a separate workspace in `studio/`. Run it with `bun run dev:studio` at <http://localhost:3333>, or deploy it to Sanity hosting with `bun --filter studio deploy`. Its schemas live in `schemas/documents/` and `schemas/fields/`, with `structure.tsx` and `slug.ts` configuring the Studio.

An article (`article`) has a title, a slug, a description (the excerpt on the index and the fallback meta description), optional SEO title and description overrides, a publish date, an optional update date, a `Show in posts overview` switch, and one direct Body field. Turn the switch off to publish an article at its URL without listing it on `/posts`. The body supports:

- Paragraphs, `h2` and `h3` headings, quotes, bulleted and numbered lists, links, and inline code.
- Images with alt text, an optional caption, and `wide`, which reaches one column further on each side.
- Code blocks (`@sanity/code-input`), highlighted with Shiki in GitHub's light and dark themes, with line numbers and a copy button.
- Tables from the `@sanity/table` plugin, used directly as a Body block. The first row is the header, and the table scrolls sideways in a labelled region when it is too wide.

Articles are written in English. Sanity keeps unpublished changes as drafts; the site only shows published posts.

## How it works

- `frontend/src/features/sanity/` holds the client and the image URL helper. The client reads only published content from the Sanity CDN, without a token, and the fetch helpers call `client.fetch` directly. There is no `<SanityLive />`, so visitors load no Sanity JavaScript and keep no connection open. Instead, publishing in Sanity triggers a new deploy ([Deployment](../deployment.md#publishing-content)).
- `frontend/src/features/posts/query.ts` and `frontend/src/features/pages/query.ts` hold the GROQ queries, written with `defineQuery`, with shared fragments such as `frontend/src/features/sanity/media/fragment.ts` (imported relatively, because TypeGen runs from `studio/` and doesn't know the `@/` alias). `bun run typegen` extracts the schema to `studio/schema.json` and writes `frontend/src/features/sanity/sanity.types.ts`. Run it after changing the schema or a query, and commit both files.
- `generateStaticParams` and the sitemap fetch with `perspective: "published"` and `stega: false`, as the guide recommends for URLs and metadata.
- `frontend/src/features/sanity/rich-text/` renders the Body with Portable Text, using `CodeBlock`, `Figure`, `Table`, and `HeadingLink`. Headings get an id from their text and copy a link to themselves when clicked.
- Reading time counts the words of `pt::text(body)` at 200 words a minute.

## Pages

- **Index** (`frontend/src/app/(web)/posts/page.tsx`, with `ArticleList` and `ArticleCard` in `frontend/src/features/posts/`): the `/posts` page document provides the title, SEO fields, and Body (heading and intro); the list of listed articles follows below it, or "No posts yet." when there are none. `/feed.xml` reads its channel title and description from this page, so keep it published. The list is ordered newest first, with one row per listed article: date in a `<time>`, linked title and description. Rows sit one line apart. The index shows no covers. Below 800px the parts stack.
- **Article** (`frontend/src/app/(web)/posts/[slug]/page.tsx`): a back link, the title, the date and reading time, the body, and links to the previous and next post. The text is centred in columns 4–9 ([Layout](layout.md#grid)).

`getArticle()` calls `notFound()` for an unknown slug, which shows the [404 page](not-found.md). The route sets `dynamicParams = true`, so an article published after the build renders on its first request instead of returning a 404.

## Feed

`frontend/src/app/feed.xml/route.ts` serves an RSS 2.0 feed of every published article.

## SEO

See [SEO and structured data](seo-and-structured-data.md#posts). The sitemap and [`llms.txt`](llms-txt.md) list every published post.

## Setting up

The Sanity project is `v3zmx1mq` with the `production` dataset. The frontend needs `NEXT_PUBLIC_SANITY_PROJECT_ID` and `NEXT_PUBLIC_SANITY_DATASET` ([Deployment](../deployment.md)), and the site's origins (`http://localhost:3000` and `https://www.kevinpierik.dev`) in the project's CORS origins, added with `bunx sanity cors add <origin> --credentials` from `studio/`.
