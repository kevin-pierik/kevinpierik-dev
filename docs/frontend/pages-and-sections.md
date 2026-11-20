# Pages and Body

Every regular page is a `page` document in Sanity, and every article is an `article` document. Both have one direct `body` field containing Portable Text. There is no page builder or section array. The homepage and Contact use Body for all visible page content. The `/posts` index is also a page document; its Body holds the heading and an optional introduction, and the route adds the article list below it.

## Page model

`studio/schemas/documents/page.ts` defines a title, URI, optional SEO object, and direct Body field. The URI is the full public path, such as `/` or `/contact`; `createUriField()` fills it from the title and checks uniqueness.

`frontend/src/app/(web)/[[...uri]]/page.tsx` statically renders every published page document except `/posts`. `frontend/src/app/(web)/posts/page.tsx` renders the `/posts` page document followed by the article list, following Sanity's Next.js pattern: editors manage the text, code renders the generated list. Both use `PageBody` from `frontend/src/features/pages/page-body.tsx`.

The site header provides the homepage `<h1>`. Other regular pages use a screenreader-only `<h1>` from the Sanity page title; visible headings are authored in Body. Set Body headings to `h2`, then use `h3` for subsections.

## Body

The same direct Body field and Portable Text renderer are used for pages and articles. It supports paragraphs, headings, quotes, lists, links, inline code, images, code blocks, and tables. Page bodies render as labelled `<article>` elements. Sanity links pass through `safeHref()`; web links show an external arrow, while internal, email, and phone links show only an underline.

Body content aligns with columns 3–10 in the site grid ([Layout](layout.md#grid)); wide images and tables can span further.

## Settings

Site-wide content lives in the `settings` singleton (`studio/schemas/documents/settings.ts`), registered with `defineSingleton` in `studio/sanity.config.ts` and shown at the top of the Studio. It holds the role shown under the name in the header and on the Open Graph image, the header navigation (references to `page` documents, in order), and the footer colophon. `frontend/src/features/site/fetch.ts` reads it with `getSettings()`; the header marks the link whose URI matches the current path, or one of its parents, as current.

Interface text that isn't content, such as the skip link, copy-button labels, the 404 text, and the article navigation, is hardcoded in the component that uses it.

## Profile metadata

Profile details appear on the homepage and Settings in Sanity, `frontend/src/features/pages/metadata.ts` (metadata and JSON-LD), `frontend/src/app/llms.txt/route.ts`, and `frontend/src/app/manifest.ts`. Keep those details aligned when changing them.
