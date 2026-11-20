# Posts

Posts live at `/posts` in English and `/nl/posts` in Dutch. Everything is called "Posts", in both languages and in the code (`frontend/src/features/posts/`). Posts are written in [Sanity](https://www.sanity.io) and fetched by the Next.js app, following Sanity's [Next.js guide](https://www.sanity.io/docs/nextjs).

## Writing a post

The Studio is a separate workspace in `studio/`. Run it with `bun run dev:studio` at <http://localhost:3333>, or deploy it to Sanity hosting with `bun --filter studio deploy`. Its schemas follow one layout: `schemas/documents/` for `page` and `article`, `schemas/fields/` for field factories such as `createUriField()` and `createRichText()`, `schemas/sections/` for page sections, plus `structure.tsx`, `i18n.ts`, and `slug.ts`.

An article (`article`) has a title, a slug, a description (the excerpt on the index and the meta description), a publish date, an optional update date, an optional cover image, and a body. The body supports:

- Paragraphs, `h2` and `h3` headings, quotes, bulleted and numbered lists, links, and inline code.
- Images with alt text, an optional caption, and `wide`, which reaches one column further on each side.
- Code blocks (`@sanity/code-input`), highlighted with Shiki in GitHub's light and dark themes, with line numbers and a copy button.
- Tables (`@sanity/table`) with an optional caption. The first row is the header.

Each language is its own document, linked as translations by `@sanity/document-internationalization`. A post can exist in one language only. Sanity keeps unpublished changes as drafts; the site only shows published posts.

## How it works

- `frontend/src/features/sanity/` holds the client, `defineLive` (`sanityFetch` and `<SanityLive />`), and the image URL helper, as in Sanity's guide. `<SanityLive />` sits in the blog layout, so only blog pages connect to Sanity, and published changes appear without a new deploy.
- `frontend/src/features/posts/query.ts` and `frontend/src/features/pages/query.ts` hold the GROQ queries, written with `defineQuery`, with shared fragments such as `frontend/src/features/sanity/media/fragment.ts` (imported relatively, because TypeGen runs from `studio/` and doesn't know the `@/` alias). `bun run typegen` extracts the schema to `studio/schema.json` and writes `frontend/src/features/sanity/sanity.types.ts`. Run it after changing the schema or a query, and commit both files.
- `generateStaticParams` and the sitemap fetch with `perspective: "published"` and `stega: false`, as the guide recommends for URLs and metadata.
- `frontend/src/features/sanity/rich-text/` renders the body with Portable Text, using `CodeBlock`, `Figure`, `Table`, and `HeadingLink`. Headings get an id from their text and copy a link to themselves when clicked.
- Reading time counts the words of `pt::text(body)` at 200 words a minute.

## Pages

- **Index** (`frontend/src/app/(web)/[locale]/posts/page.tsx`, with `ArticleList` and `ArticleCard` in `frontend/src/features/posts/`): an ordered list, newest first, with one row per article: the date in a `<time>` in columns 3–4, then the linked title (`<h2>`, a `nav` link that underlines on hover) and the description in columns 5–10. Rows sit one line apart, like CV entries. The index shows no covers; they appear on the article page. Below 800px the parts stack. The title is the only link, so each post is one tab stop. The `<h1>` reads "Posts:", styled like a CV section title.
- **Article** (`frontend/src/app/(web)/[locale]/posts/[slug]/page.tsx`): a back link, the title, the date and reading time, the body, and links to the previous and next post. The text is centred in columns 4–9 ([Layout](layout.md#grid)).

Unknown slugs show the [404 page](not-found.md) (`dynamicParams = false`).

## Feed

`frontend/src/app/feed.xml/route.ts` serves an RSS 2.0 feed of every published article, in both languages, with each item's language in `dc:language`.

## SEO

See [SEO and structured data](seo-and-structured-data.md#blog). The sitemap and [`llms.txt`](llms-txt.md) list every published post.

## Setting up

The Sanity project is `v3zmx1mq` with the `production` dataset. The frontend needs `NEXT_PUBLIC_SANITY_PROJECT_ID` and `NEXT_PUBLIC_SANITY_DATASET` ([Deployment](../deployment.md)), and the site's origins (`http://localhost:3000` and `https://www.kevinpierik.dev`) in the project's CORS origins, added with `bunx sanity cors add <origin> --credentials` from `studio/`.
