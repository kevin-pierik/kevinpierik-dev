# Pages and sections

Every regular page is a `page` document in Sanity, and every article is an `article` document. Both build their visible content from a `sections` array, a page builder following Sanity's page builder pattern. The `/posts` index is also a page document; its sections hold the heading and an optional introduction, and the route adds the article list below them.

## Document model

`studio/schemas/documents/page.ts` defines a title, URI, sections, and an SEO object, split into the field groups (tabs) **Page**, **Content**, and **SEO**. Articles use **Post**, **Content**, and **SEO** ([Posts](posts.md)). The groups have no icons. The URI is the full public path, such as `/` or `/posts`; `createUriField()` fills it from the title and checks uniqueness.

`frontend/src/app/[[...uri]]/page.tsx` statically renders every published page document except `/posts`. `frontend/src/app/posts/page.tsx` renders the `/posts` page document and adds its `Blog` JSON-LD. Both use `PageBody` from `frontend/src/features/pages/page-body.tsx`. Everything visible comes from sections, including the post lists, through the Posts section.

A page that starts with a Hero section gets its `<h1>` from the hero. Other pages use a screenreader-only `<h1>` from the Sanity page title; visible headings are authored in sections. Set headings to `h2`, then use `h3` for subsections.

## Sections

`studio/schemas/fields/create-sections.ts` defines the section types, and `createSections()` picks the ones a document type allows. Every section has an icon and a preview with its content and type name, such as "About me · Text", "Demo · Media · Video", or "Projects · Carousel · 4 items".

| Section  | `_type`           | Pages | Articles | Content                                                                                                                                                                               |
| -------- | ----------------- | ----- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Hero     | `heroSection`     | yes   | no       | A small line, the heading, an optional second line in `muted`, a lead, up to two buttons, a large or small size, centred or left alignment, and an optional image. First section only |
| Text     | `textSection`     | yes   | yes      | An optional title, then Portable Text: paragraphs, `h2` and `h3`, quotes, lists, links, inline code                                                                                   |
| Media    | `mediaSection`    | yes   | yes      | An image or a Mux video, with an optional caption and `wide`                                                                                                                          |
| Posts    | `postsSection`    | yes   | no       | An optional title, the number of posts (empty for all), Grid or List, and an optional link to all posts                                                                               |
| Carousel | `carouselSection` | yes   | yes      | Optional title and items, each with an image, a title, an optional link, and a description                                                                                            |
| List     | `listSection`     | yes   | yes      | A title, an optional second line, an optional button, and items, each with an optional period, a title, an organization, a link, a description, a location, and tags                  |
| Code     | `code`            | no    | yes      | A `@sanity/code-input` block                                                                                                                                                          |
| Table    | `table`           | no    | yes      | A `@sanity/table` table                                                                                                                                                               |

Code and table use the plugins' own type names, `code` and `table`, as `_type`.

`frontend/src/features/sections/fragment.ts` holds the shared GROQ projection, and `frontend/src/features/sections/index.tsx` renders sections with a `switch` on `_type`. Text, media, code, and tables render flat elements, not a wrapper, so the page body or article gives each a centred maximum width, with `wide` figures across the container ([Layout](layout.md#columns)). List, Carousel, and grid Posts sections render one `<section>` marked `data-full`, which removes that maximum width, with their heading in `headingStyles.section` and 6rem (10rem from the `site` breakpoint) of space above. Text sections use the Portable Text renderer in `frontend/src/features/sanity/rich-text/`. A text section with a title renders like the other homepage sections (`titled-text.tsx`): a `<section>` marked `data-full`, the title as an `<h2>` in `headingStyles.section` on the left, and the text at 1.0625rem on the right, as About me on the homepage. Without a title it renders flat, as before. Sanity links pass through `safeHref()`; web links show an external arrow, while internal, email, and phone links show only an underline.

### Hero

`frontend/src/features/sections/hero.tsx` renders the hero, modelled on beside.com: a `<section>` with the page's `<h1>` (`id="page-title"`, which also labels `<main>`, so the section itself has no label), with a small line above the heading (`muted` text in a large hero, a `subtle` pill in a small one), the heading at 4rem (2.25rem on small screens) with an optional second line in `muted`, a lead, and up to two buttons. **Size** is Large (the default, as on the homepage) or Small, as on `/projects`: the heading at 2.5rem (1.75rem on small screens), the size of a post title, with 7.5rem of space above. It has three layouts:

- **Centre** (the default): everything centred, as on the homepage and `/projects`.
- **Left**: the text left-aligned in a column of at most 36rem.
- **With an image**: two columns from the `site` breakpoint, the text on the left and the image on the right with `rounded-2xl`. The text is then always left-aligned.

`buttons.tsx` renders the buttons for the hero and the List section: the first is `primary`, the second `outline`. Links may be a path such as `/contact` and pass through `safeHref()`. The Studio only allows one hero, as the first section. `PageBody` renders it above the page's `<article>`, the way beside puts the hero section before the rest, and leaves the article out when the hero is the only section, as on `/projects`. When more follows, a large hero has 10rem (6rem on small screens) of space below it and a small one 4rem (3rem). In Markdown the hero becomes plain text, because the page title is already the heading.

### Posts

`frontend/src/features/sections/posts.tsx` is an async server component that fills itself with `getArticles()`, the newest first, and renders them with `ArticleList` ([Posts](posts.md#pages)). Editors pick an optional heading, how many posts to show (empty for all), **Two columns** (as Writing on the homepage), **Three columns** (as on `/posts`), or **One column (list)**, and whether to show a `subtle` "See all posts" link next to the heading. Without a heading or link it renders only the list, and the card titles become `<h2>` instead of `<h3>`, so a page with only a hero above it doesn't skip a heading rank. With no listed posts it shows "Coming soon" in a `subtle` pill, like the line above a small hero. Pages only; articles can't use it. In Markdown it renders nothing, because `llms.txt` and `llms-full.txt` already list every post.

### Media

`createMediaFields()` in `studio/schemas/fields/create-media.ts` defines the media used by the Media section and by carousel items: a **Type** radio (Image or Video), then only the fields for that type.

- **Image:** a Sanity image with required alt text, served through the Sanity image loader.
- **Video:** a [Mux](https://www.mux.com) video (`mux.video` from `sanity-plugin-mux-input`), a required description for screen readers, and **Autoplay**. Autoplay plays the video muted on a loop, like a GIF, with the controls still available; it is skipped when the visitor asks for reduced motion.

`frontend/src/features/sections/media.tsx` renders either one, inside `Figure` from `frontend/src/components/figure.tsx`, which centres the caption below it in `muted`, as beside.com does. Both get `rounded-2xl`, the same radius as the cards on `/posts`. Videos are a plain native `<video controls playsinline>` in `video.tsx`, with no player library, so Safari shows its own video controls. Mux only hosts the files:

- The first `<source>` is Mux's HLS stream (`stream.mux.com/{playbackId}.m3u8`), which Safari plays natively, with quality that adapts to the connection.
- The second is a static MP4 (`stream.mux.com/{playbackId}/highest.mp4`) for browsers without native HLS. The Studio creates it because `muxInput({static_renditions: ['highest']})` is set in `studio/sanity.config.ts`; videos uploaded before that setting have no MP4 and only play where HLS works.
- The poster is Mux's thumbnail (`image.mux.com/{playbackId}/thumbnail.webp`), and the size comes from the video's own aspect ratio (`data.aspect_ratio`). In a carousel the video fills the 16:10 frame.
- Captions are Mux text tracks (`data.tracks`, type `text`, status `ready`), rendered as native `<track kind="captions">` elements from `stream.mux.com/{playbackId}/text/{trackId}.vtt`; the first one is on by default. Mux generates them when you pick a language while uploading in the Studio. The video has `crossOrigin="anonymous"`, because browsers only load tracks from another origin with CORS, which Mux allows.
- `video.tsx` is a small client component only for autoplay: it mutes and plays the video after hydration, and pauses it when the visitor asks for reduced motion. The browser controls stay visible, so a looping video can always be paused.

#### Mux setup

Uploading in the Studio needs a Mux account. In the Mux dashboard, open **Settings → Access Tokens**, create a token with **Mux Video: Read and Write** and **Mux Data: Read**, and paste the token ID and secret into the Studio the first time you add a video. The plugin stores them in the document `secrets.mux`; its ID has a dot, so it is never readable through the public dataset. The website needs no Mux keys, because it only uses public playback IDs.

### Carousel

`frontend/src/features/sections/carousel.tsx` renders the title as an `h2`, then a [Blossom Carousel](https://www.blossom-carousel.com) list (`@blossom-carousel/react`), labelled by that heading. Each slide title is an `h3`. Blossom uses native scrolling with scroll snap and only loads its drag engine (`@blossom-carousel/core`) on devices with a fine pointer, so touch and trackpads scroll natively. The list has `tabIndex={0}` and the shared focus outline, because Blossom doesn't make the scroller focusable, so keyboard users can reach and scroll it even when no slide has a link. It also has `role="list"`, because `list-style: none` makes Safari drop the list semantics. Slide links pass through `SanityLink`. `blossom.ts` re-exports the component from a `"use client"` module, because the package has no directive; the small wrapper ships with every page that renders sections, and Blossom's stylesheet is global.

- The carousel runs from edge to edge of the screen with the `bleed` utility in `tailwind.css`, which sets `--gutter` to the container's side padding and pulls the wrapper out by it on both sides. The list has the same `--gutter` as `padding-inline` and `scroll-padding-inline`, so the first slide lines up with the container's left edge, scrolled slides run off both edges of the screen, and the last slide stops at the container's right edge. `html` has `overflow-x: clip`, so the bleed never causes a horizontal scrollbar.
- Slides are at most 22.5rem wide (80vw on small screens), snap to the start, and sit 1.5rem apart. Each shows its media in a rounded 16:10 frame with a `subtle` background, the title (a `nav` link with ↗ when it has a link), and the description in `muted`.
- A slide without an image or video shows a "Coming soon" wordmark on a checkerboard of `subtle` and the page colour, like a transparent image, so projects can be announced before there is anything to show.
- The stylesheet is imported in `global.css` into the `components` layer. Its own `blossom-carousel` layer would otherwise come after Tailwind's `utilities` and override the slide layout.

### List

`frontend/src/features/sections/list.tsx` renders an accordion, for example for a FAQ. The homepage used it for Experience before that became the About me text section. From the `site` breakpoint, the `h2`, with an optional second line in `muted` and an optional button below it, takes the left 27.5 of 66 parts of the row and is `sticky` below the header while the list scrolls past, like the FAQ on beside.com; the list takes the rest, 4rem away. Below it they stack.

The accordion is `accordion.tsx`, a small client component modelled on the FAQ on beside.com. Only one item is open at a time, the first by default. Each item is a rounded card:

- The row shows the period in `muted` and the title (an `h3`). With an organization it reads "UX Developer at Friday Digital Agency", and only the organization is the `nav` link; without one the whole title is. The link is 24px high, so it meets the WCAG target size on top of the button. A `<button>` with `aria-expanded` and `aria-controls` lies under the whole row, with a screen-reader-only "More about …" and a plus icon at the right, so clicking anywhere on the row outside the link toggles it. The `h3` sits above the button with `pointer-events: none`; the link turns them back on. The heading can't hold the button, because the button would then contain the link.
- The panel has the description and location in `muted` and the tags as small pills in the page colour, in a list labelled "Skills". While it is closed it is `inert`, so its content can't be focused or read.
- Opening and closing take 200ms both ways and work in every browser: the card fades to `subtle`, the plus turns 45° into a cross, and the panel grows from `grid-template-rows: 0fr` to `1fr` with `ease-out`. The global reduced-motion rule in `animations.css` makes them instant.

Without JavaScript the first item is open and the others stay closed. In Markdown each item is a bullet that starts with its period.

## Settings

Site-wide content lives in the `settings` singleton (`studio/schemas/documents/settings.ts`), registered with `defineSingleton` in `studio/sanity.config.ts` and shown at the top of the Studio. It holds the role shown under the name in the header and on the Open Graph image, and the header navigation (references to `page` documents, in order). `frontend/src/features/site/fetch.ts` reads it with `getSettings()`; the header marks the link whose URI matches the current path, or one of its parents, as current.

Interface text that isn't content, such as the skip link, copy-button labels, the article call to action, the contact page, and the 404 text, is hardcoded in the component that uses it.

## Profile metadata

Profile details appear on the homepage (including its hero) and Settings in Sanity, `frontend/src/features/pages/metadata.ts` (metadata and JSON-LD), `frontend/src/app/llms.txt/route.ts`, and `frontend/src/app/manifest.ts`. Keep those details aligned when changing them.
