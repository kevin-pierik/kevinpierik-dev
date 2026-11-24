# Pages and sections

Every regular page is a `page` document in Sanity, and every article is an `article` document. Both build their visible content from a `sections` array, a page builder following Sanity's page builder pattern. The `/posts` index is also a page document; its sections hold the heading and an optional introduction, and the route adds the article list below them.

## Document model

`studio/schemas/documents/page.ts` defines a title, URI, sections, and an SEO object, split into the field groups (tabs) **Page**, **Content**, and **SEO**. Articles use **Post**, **Content**, and **SEO** ([Posts](posts.md)). The groups have no icons. The URI is the full public path, such as `/` or `/posts`; `createUriField()` fills it from the title and checks uniqueness.

`frontend/src/app/[[...uri]]/page.tsx` statically renders every published page document except `/posts`. `frontend/src/app/posts/page.tsx` renders the `/posts` page document followed by the article list, following Sanity's Next.js pattern: editors manage the text, code renders the generated list. Both use `PageBody` from `frontend/src/features/pages/page-body.tsx`.

The site header provides the homepage `<h1>`. Other regular pages use a screenreader-only `<h1>` from the Sanity page title; visible headings are authored in sections. Set headings to `h2`, then use `h3` for subsections.

## Sections

`studio/schemas/fields/create-sections.ts` defines the section types, and `createSections()` picks the ones a document type allows. Every section has an icon and a preview with its content and type name, such as "About me · Text", "Demo · Media · Video", or "Projects · Carousel · 4 items".

| Section  | `_type`           | Pages | Articles | Content                                                                                                   |
| -------- | ----------------- | ----- | -------- | --------------------------------------------------------------------------------------------------------- |
| Text     | `textSection`     | yes   | yes      | Portable Text: paragraphs, `h2` and `h3`, quotes, lists, links, inline code                               |
| Media    | `mediaSection`    | yes   | yes      | An image or a Mux video, with an optional caption and `wide`                                              |
| Carousel | `carouselSection` | yes   | yes      | Optional title and items, each with an image, a title, an optional link, and a description                |
| List     | `listSection`     | yes   | yes      | A title and items, each with an optional period, a title, an optional link, a description, and a location |
| Code     | `code`            | no    | yes      | A `@sanity/code-input` block                                                                              |
| Table    | `table`           | no    | yes      | A `@sanity/table` table                                                                                   |

Code and table use the plugins' own type names, `code` and `table`, as `_type`.

`frontend/src/features/sections/fragment.ts` holds the shared GROQ projection, and `frontend/src/features/sections/index.tsx` renders sections with a `switch` on `_type`. Each section renders flat elements, not a wrapper, so the page or article grid places them like before: text in columns 3–10 (4–9 in articles), figures and tables in 3–10, `wide` figures in 2–11 ([Layout](layout.md#grid)). Text sections use the Portable Text renderer in `frontend/src/features/sanity/rich-text/`. Sanity links pass through `safeHref()`; web links show an external arrow, while internal, email, and phone links show only an underline.

### Media

`createMediaFields()` in `studio/schemas/fields/create-media.ts` defines the media used by the Media section and by carousel items: a **Type** radio (Image or Video), then only the fields for that type.

- **Image:** a Sanity image with required alt text, served through the Sanity image loader.
- **Video:** a [Mux](https://www.mux.com) video (`mux.video` from `sanity-plugin-mux-input`), a required description for screen readers, and **Autoplay**. Autoplay plays the video muted on a loop, like a GIF, with the controls still available; it is skipped when the visitor asks for reduced motion.

`frontend/src/features/sections/media.tsx` renders either one. Videos are a plain native `<video controls playsinline>` in `video.tsx`, with no player library, so Safari shows its own video controls. Mux only hosts the files:

- The first `<source>` is Mux's HLS stream (`stream.mux.com/{playbackId}.m3u8`), which Safari plays natively, with quality that adapts to the connection.
- The second is a static MP4 (`stream.mux.com/{playbackId}/highest.mp4`) for browsers without native HLS. The Studio creates it because `muxInput({static_renditions: ['highest']})` is set in `studio/sanity.config.ts`; videos uploaded before that setting have no MP4 and only play where HLS works.
- The poster is Mux's thumbnail (`image.mux.com/{playbackId}/thumbnail.webp`), and the size comes from the video's own aspect ratio (`data.aspect_ratio`). In a carousel the video fills the 16:10 frame.
- Captions are Mux text tracks (`data.tracks`, type `text`, status `ready`), rendered as native `<track kind="captions">` elements from `stream.mux.com/{playbackId}/text/{trackId}.vtt`; the first one is on by default. Mux generates them when you pick a language while uploading in the Studio. The video has `crossOrigin="anonymous"`, because browsers only load tracks from another origin with CORS, which Mux allows.
- `video.tsx` is a small client component only for autoplay: it mutes and plays the video after hydration, and pauses it when the visitor asks for reduced motion. The browser controls stay visible, so a looping video can always be paused.

#### Mux setup

Uploading in the Studio needs a Mux account. In the Mux dashboard, open **Settings → Access Tokens**, create a token with **Mux Video: Read and Write** and **Mux Data: Read**, and paste the token ID and secret into the Studio the first time you add a video. The plugin stores them in the document `secrets.mux`; its ID has a dot, so it is never readable through the public dataset. The website needs no Mux keys, because it only uses public playback IDs.

### Carousel

`frontend/src/features/sections/carousel.tsx` renders the title as an `h2`, then a [Blossom Carousel](https://www.blossom-carousel.com) list (`@blossom-carousel/react`), labelled by that heading. Each slide title is an `h3`. Blossom uses native scrolling with scroll snap and only loads its drag engine (`@blossom-carousel/core`) on devices with a fine pointer, so touch and trackpads scroll natively. The list has `tabIndex={0}` and the shared focus outline, because Blossom doesn't make the scroller focusable, so keyboard users can reach and scroll it even when no slide has a link. It also has `role="list"`, because `list-style: none` makes Safari drop the list semantics. Slide links pass through `SanityLink`. `blossom.ts` re-exports the component from a `"use client"` module, because the package has no directive; the small wrapper ships with every page that renders sections, and Blossom's stylesheet is global.

- The carousel starts in column 3 and runs to the right edge of the screen, using the `bleed-end` utility in `tailwind.css` and `data-bleed` on its wrapper. `html` has `overflow-x: clip`, so the bleed never causes a horizontal scrollbar.
- Slides are at most 28rem wide (80vw on small screens), snap to the start, and sit 1.5rem apart. Each shows its media in a 16:10 frame with a `subtle` background, the title (a `nav` link with ↗ when it has a link), and the description in `muted`.
- The stylesheet is imported in `global.css` into the `components` layer. Its own `blossom-carousel` layer would otherwise come after Tailwind's `utilities` and override the slide layout.

### List

`frontend/src/features/sections/list.tsx` renders the title as an `h2`, then an `<ol>` labelled by it, with the same rows as the posts index: the period in `muted` in columns 3–4, and the title (an `h3`, a `nav` link when it has a link) with the description and location in `muted` in columns 5–10. The list is a full-width `grid-site` marked `data-full`, which the page and article grids place across all columns, so its columns line up with the posts index. Use it for a CV, such as work and education on the homepage. In Markdown each item is a bullet that starts with its period.

## Settings

Site-wide content lives in the `settings` singleton (`studio/schemas/documents/settings.ts`), registered with `defineSingleton` in `studio/sanity.config.ts` and shown at the top of the Studio. It holds the role shown under the name in the header and on the Open Graph image, and the header navigation (references to `page` documents, in order). `frontend/src/features/site/fetch.ts` reads it with `getSettings()`; the header marks the link whose URI matches the current path, or one of its parents, as current.

Interface text that isn't content, such as the skip link, copy-button labels, the 404 text, and the article navigation, is hardcoded in the component that uses it.

## Profile metadata

Profile details appear on the homepage and Settings in Sanity, `frontend/src/features/pages/metadata.ts` (metadata and JSON-LD), `frontend/src/app/llms.txt/route.ts`, and `frontend/src/app/manifest.ts`. Keep those details aligned when changing them.
