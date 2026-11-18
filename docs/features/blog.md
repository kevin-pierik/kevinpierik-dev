# Blog

The blog lives at `/blog` in English and `/nl/blog` in Dutch. Posts are written in [Sanity](https://www.sanity.io) and fetched by the Next.js app, following Sanity's [Next.js guide](https://www.sanity.io/docs/nextjs).

## Writing a post

The Studio is a standalone app in `sanity/`, with its own `package.json` (npm, because `create-sanity` doesn't support Bun), as Sanity recommends. Run it with `npm --prefix sanity run dev` at <http://localhost:3333>, or deploy it to `kevinpierik.sanity.studio` with `npm --prefix sanity run deploy`. Its schemas follow one layout: `schemas/documents/` for `page` and `article`, `schemas/fields/` for field factories such as `createUriField()` and `createRichText()`, `schemas/sections/` for page sections, plus `structure.tsx`, `i18n.ts`, and `slug.ts`.

An article (`article`) has a title, a slug, a description (the timeline excerpt and meta description), a publish date, an optional update date, an optional cover image, and a body. The body supports:

- Paragraphs, `h2` and `h3` headings, quotes, bulleted and numbered lists, links, and inline code.
- Images with alt text, an optional caption, and `wide`, which reaches one column further on each side.
- Code blocks (`@sanity/code-input`), highlighted with Shiki in GitHub's light and dark themes, with line numbers and a copy button.
- Tables (`@sanity/table`) with an optional caption. The first row is the header.

Each language is its own document, linked as translations by `@sanity/document-internationalization`. A post can exist in one language only. Sanity keeps unpublished changes as drafts; the site only shows published posts.

## How it works

- `features/sanity/` holds the client, `defineLive` (`sanityFetch` and `<SanityLive />`), and the image URL helper, as in Sanity's guide. `<SanityLive />` sits in the blog layout, so only blog pages connect to Sanity, and published changes appear without a new deploy.
- `features/blog/query.ts` and `features/pages/query.ts` hold the GROQ queries, written with `defineQuery`, with shared fragments such as `features/sanity/media/fragment.ts` (imported relatively, because TypeGen runs from `sanity/` and doesn't know the `@/` alias). `bun run typegen` extracts the schema to `sanity/schema.json` and writes `features/sanity/sanity.types.ts`. Run it after changing the schema or a query, and commit both files.
- `generateStaticParams` and the sitemap fetch with `perspective: "published"` and `stega: false`, as the guide recommends for URLs and metadata.
- `features/sanity/rich-text/` renders the body with Portable Text, using `CodeBlock`, `Figure`, `Table`, and `HeadingLink`. Headings get an id from their text and copy a link to themselves when clicked.
- Reading time counts the words of `pt::text(body)` at 200 words a minute.

## Pages

- **Index** (`app/(web)/[locale]/blog/page.tsx`, with `ArticleList` and `ArticleCard` in `features/blog/`): a ui-sdk `Timeline` with one item per article: the date in columns 1–2, the dot on a line in the gap before column 3, and the cover, title, description, and "Read post" link in columns 3–10. The `<h1>` is visually hidden.
- **Article** (`app/(web)/[locale]/blog/[slug]/page.tsx`): a back link, the title, the date and reading time, the body, and links to the previous and next post. The text is centred in columns 4–9 ([Layout](layout.md#grid)).

Unknown slugs show the [404 page](not-found.md) (`dynamicParams = false`).

## Feed

`app/feed.xml/route.ts` serves an RSS 2.0 feed of every published article, in both languages, with each item's language in `dc:language`.

## SEO

See [SEO and structured data](seo-and-structured-data.md#blog). The sitemap and [`llms.txt`](llms-txt.md) list every published post.

## Setting up

The Sanity project is `v3zmx1mq` with the `production` dataset. The site needs `NEXT_PUBLIC_SANITY_PROJECT_ID` and `NEXT_PUBLIC_SANITY_DATASET` ([Deployment](../deployment.md)), and the site's origins (`http://localhost:3000` and `https://www.kevinpierik.dev`) in the project's CORS origins, added with `npx sanity cors add <origin> --credentials` from `sanity/`.
