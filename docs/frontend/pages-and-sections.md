# Pages and Body

Every regular page is a `page` document in Sanity, and every article is an `article` document. Both have one direct `body` field containing Portable Text. There is no page builder or section array. The homepage and Contact use Body for all visible page content. The `/posts` index is also a page document; its Body holds the heading, an optional introduction, and a Post list block.

## Page model

`studio/schemas/documents/page.ts` defines a title, URI, optional SEO object, and direct Body field. The URI is the full public path, such as `/` or `/contact`; `createUriField()` fills it from the title and checks uniqueness.

`frontend/src/app/(web)/[[...uri]]/page.tsx` statically renders every published page document, including `/posts`. There are no per-page routes; the article route `posts/[slug]` is the only other content route.

The site header provides the homepage `<h1>`. Other regular pages use a screenreader-only `<h1>` from the Sanity page title; visible headings are authored in Body. Set Body headings to `h2`, then use `h3` for subsections.

## Body

The same direct Body field and Portable Text renderer are used for pages and articles. It supports paragraphs, headings, quotes, lists, links, inline code, images, code blocks, and tables. Page bodies also accept a **Post list** block (`articleList`, `studio/schemas/objects/article-list.ts`), passed to `createRichText({of})` by the page schema only. Page bodies render as labelled `<article>` elements. Sanity links pass through `safeHref()`; web links show an external arrow, while internal, email, and phone links show only an underline.

Body content aligns with columns 3–10 in the site grid ([Layout](layout.md#grid)); wide images and tables can span further, and elements with `data-full` (the post list) span the full grid.

## Post list

The Post list block renders `ArticleList` from `frontend/src/features/posts/`: the newest listed articles, optionally capped by the block's `limit`, or "No posts yet." when there are none. It spaces itself like any other Body block. Put an `h2` above it; article titles in the list are `h3`. A page whose Body contains a Post list also gets the `Blog` JSON-LD ([SEO](seo-and-structured-data.md#blog)).

## Settings

Site-wide content lives in the `settings` singleton (`studio/schemas/documents/settings.ts`), registered with `defineSingleton` in `studio/sanity.config.ts` and shown at the top of the Studio. It holds the role shown under the name in the header and on the Open Graph image, the header navigation (references to `page` documents, in order), and the footer colophon. `frontend/src/features/site/fetch.ts` reads it with `getSettings()`; the header marks the link whose URI matches the current path, or one of its parents, as current.

Interface text that isn't content, such as the skip link, copy-button labels, the 404 text, and the article navigation, is hardcoded in the component that uses it.

## Profile metadata

Profile details appear on the homepage and Settings in Sanity, `frontend/src/features/pages/metadata.ts` (metadata and JSON-LD), `frontend/src/app/llms.txt/route.ts`, and `frontend/src/app/manifest.ts`. Keep those details aligned when changing them.
