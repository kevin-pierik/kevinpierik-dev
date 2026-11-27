# Pages and sections

Every regular page is a `page` document in Sanity, and every article is an `article` document. Both build their visible content from a `sections` array, a page builder following Sanity's page builder pattern. The `/posts` index is also a page document; a Posts section in its sections renders the article list.

## Document model

`studio/schemas/documents/page.ts` defines a title, URI, sections, and an SEO object, split into the field groups (tabs) **Page**, **Content**, and **SEO**. Articles use **Post**, **Content**, and **SEO** ([Posts](posts.md)). The groups have no icons. The URI is the full public path, such as `/` or `/posts`; `createUriField()` fills it from the title, checks that it is unique, and rejects anything `uriProblem()` in `studio/slug.ts` flags: a missing leading slash, a trailing slash, characters other than lowercase letters, numbers, and single hyphens, or a path the site already uses (`/contact`, `/privacy`, `/api`, `/studio`, and anything below `/posts/`).

`frontend/src/app/[[...uri]]/page.tsx` statically renders every published page document, `/posts` included, with `PageBody` from `frontend/src/features/pages/page-body.tsx`. It adds JSON-LD only to the homepage and `/posts` ([SEO](seo-and-structured-data.md)). Everything visible comes from sections, including the post lists, through the Posts section.

A page that starts with a Hero section gets its `<h1>` from the hero. Other pages use a screenreader-only `<h1>` from the Sanity page title; visible headings are authored in sections. Set headings to `h2`, then use `h3` for subsections. In a text section with a title, the title is the `h2`, so the text's `h2` and `h3` render as `h3` and `h4` (`nestedRichTextComponents`).

## Sections

`studio/schemas/fields/create-sections.ts` defines the section types, and `createSections()` picks the ones a document type allows. Every section has an icon and a preview with its content and type name, such as "About me · Text", "Demo · Media · Video", or "Projects · Carousel · 4 items".

| Section    | `_type`           | Pages | Articles | Content                                                                                                                                                                                                     |
| ---------- | ----------------- | ----- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Hero       | `heroSection`     | yes   | no       | A small line with an optional icon, the heading, an optional second line in `muted`, a lead, up to two buttons, a large or small size, centred or left alignment, and an optional image. First section only |
| Text       | `textSection`     | yes   | yes      | An optional title, then Portable Text: paragraphs, `h2` and `h3`, quotes, lists, links, inline code                                                                                                         |
| Media      | `mediaSection`    | yes   | yes      | An image or a Mux video, with an optional caption and `wide`                                                                                                                                                |
| Posts      | `postsSection`    | yes   | no       | An optional title, the number of posts (empty for all), Grid or List, and an optional link to all posts                                                                                                     |
| Carousel   | `carouselSection` | yes   | yes      | A title and items, each with an image or video, a title, an optional link, and a description                                                                                                                |
| List       | `listSection`     | yes   | yes      | A title, an optional second line, an optional button, and items, each with an optional period, a title, an organization, a link, a description, a location, and tags                                        |
| Link cards | `linksSection`    | yes   | no       | An optional eyebrow, a title, a short text, and cards, each with a label and a link                                                                                                                         |
| Code       | `code`            | no    | yes      | A `@sanity/code-input` block                                                                                                                                                                                |
| Table      | `table`           | no    | yes      | A `@sanity/table` table                                                                                                                                                                                     |

Code and table use the plugins' own type names, `code` and `table`, as `_type`.

`frontend/src/features/sections/fragment.ts` holds the shared GROQ projection, and `frontend/src/features/sections/index.tsx` renders sections with a `switch` on `_type`. A section with its own helper file gets a folder with an `index.tsx` (`carousel/`, `list/`, `media/`); the others are single files. Text, media, code, and tables render flat elements, not a wrapper, so the page body or article gives each a centred maximum width, with `wide` figures across the container ([Layout](layout.md#columns)). List, Carousel, and grid Posts sections render one `<section>` marked `data-full`, which removes that maximum width, with their heading in `headingStyles.section` and 6rem (10rem from the `site` breakpoint) of space above. Text sections use the Portable Text renderer in `frontend/src/features/sanity/rich-text/`. A text section with a title renders like the other homepage sections (`titled-text.tsx`): a `<section>` marked `data-full`, the title as an `<h2>` in `headingStyles.section` on the left, and the text at 1.0625rem on the right, as About me on the homepage. Without a title it renders flat, as before. Section titles and text headings get an id from `headingId()` in `frontend/src/features/sanity/rich-text/index.tsx`: the slugified text, or a fallback from the block key when that is empty or would clash with an id the layout uses (`main`, `main-title`, `page-title`, `footer-title`). `HeadingLink` renders the heading with the copy-link icon and its status message as siblings, not inside it, so the heading's accessible name is only its text. The wrapper aligns the icon to the heading's baseline, so it stays next to the text even when a grid stretches the wrapper, as in a titled text section. Sanity links pass through `safeHref()`; web links show an external arrow, while internal, email, and phone links show only an underline.

### Hero

`frontend/src/features/sections/hero.tsx` renders the hero, modelled on beside.com: a `<section>` with the page's `<h1>` (`id="page-title"`, which also labels `<main>`, so the section itself has no label), with a small line above the heading (`muted` text in a large hero, a `subtle` pill in a small one), optionally led by an **Eyebrow icon** (a Lucide icon, see [Links and buttons](links-and-buttons.md#icons); for now only Rocket, as on `/projects`; add one by importing it into `eyebrowIcons` in `hero.tsx` and adding its value to the field's list in `create-sections.ts`), the heading at `text-6xl` (`text-4xl` on small screens) with an optional second line in `muted`, a lead, and up to two buttons. **Size** is Large (the default, as on the homepage) or Small, as on `/projects`: the heading at `text-4xl` (`text-3xl` on small screens), the size of a post title, with 7.5rem of space above. It has three layouts:

- **Centre** (the default): everything centred, as on the homepage and `/projects`.
- **Left**: the text left-aligned in a column of at most 36rem.
- **With an image**: two columns from the `site` breakpoint, the text on the left and the image on the right with `rounded-2xl`. The text is then always left-aligned.

`buttons.tsx` renders the buttons for the hero and the List section: the first is `primary`, the second `outline`. Links may be a path such as `/contact` and pass through `safeHref()`. The Studio only allows one hero, as the first section. `PageBody` renders it above the page's `<article>`, the way beside puts the hero section before the rest, and leaves the article out when the hero is the only section, as on `/projects`. A large hero fills the first screen: it is at least the viewport height (`100svh`) minus the header, with its content centred vertically and 6rem (4.5rem on small screens) of padding above and below, so the next section only appears when you scroll. When more follows, a small hero has 4rem (3rem on small screens) of space below it. In Markdown the hero becomes plain text, because the page title is already the heading.

### Posts

`frontend/src/features/sections/posts.tsx` is an async server component that fills itself with `getArticles()`, the newest first, and renders them with `ArticleList` ([Posts](posts.md#pages)). Editors pick an optional heading, how many posts to show (empty for all), **Two columns** (as Writing on the homepage), **Three columns** (as on `/posts`), or **One column (list)**, and whether to show a `subtle` "See all posts" link next to the heading. Without a heading or link it renders only the list, and the card titles become `<h2>` instead of `<h3>`, so a page with only a hero above it doesn't skip a heading rank. With no listed posts it shows "Coming soon" in a `subtle` pill, like the line above a small hero. Pages only; articles can't use it. In Markdown it renders nothing, because `llms.txt` and `llms-full.txt` already list every post.

### Media

`createMediaFields()` in `studio/schemas/fields/create-media.ts` defines the media used by the Media section and by carousel items: a **Type** radio (Image or Video), then only the fields for that type. The image is required unless the type is Video.

- **Image:** a Sanity image with required alt text, served through the Sanity image loader.
- **Video:** a [Mux](https://www.mux.com) video (`mux.video` from `sanity-plugin-mux-input`), a required description for screen readers, and **Autoplay**. Autoplay plays the video muted on a loop, like a GIF, with the controls still available; it is skipped when the visitor asks for reduced motion.

`frontend/src/features/sections/media/index.tsx` renders either one, inside `Figure` from `frontend/src/components/figure.tsx`, which centres the caption below it in `muted`, as beside.com does. Its `sizes` match the column (885px, or 1120px when `wide`, and 93vw below that), so the browser picks the right image width. Both get `rounded-2xl`, the same radius as the cards on `/posts`. Videos are a plain native `<video controls playsinline>` in `video.tsx`, with no player library, so Safari shows its own video controls. Mux only hosts the files:

- The first `<source>` is Mux's HLS stream (`stream.mux.com/{playbackId}.m3u8`), which Safari plays natively, with quality that adapts to the connection.
- The second is a static MP4 (`stream.mux.com/{playbackId}/highest.mp4`) for browsers without native HLS. The Studio creates it because `muxInput({static_renditions: ['highest']})` is set in `studio/sanity.config.ts`; videos uploaded before that setting have no MP4 and only play where HLS works.
- The poster is Mux's thumbnail (`image.mux.com/{playbackId}/thumbnail.webp`), and the size comes from the video's own aspect ratio (`data.aspect_ratio`). In a carousel the video fills the 16:10 frame.
- Captions are Mux text tracks (`data.tracks`, type `text`, status `ready`), rendered as native `<track kind="captions">` elements from `stream.mux.com/{playbackId}/text/{trackId}.vtt`; the first one is on by default. Mux generates them when you pick a language while uploading in the Studio. The video has `crossOrigin="anonymous"`, because browsers only load tracks from another origin with CORS, which Mux allows.
- `media/video.tsx` is a small client component only for autoplay: it mutes and plays the video after hydration, and pauses it when the visitor asks for reduced motion. The browser controls stay visible, so a looping video can always be paused.

#### Mux setup

Uploading in the Studio needs a Mux account. In the Mux dashboard, open **Settings → Access Tokens**, create a token with **Mux Video: Read and Write** and **Mux Data: Read**, and paste the token ID and secret into the Studio the first time you add a video. The plugin stores them in the document `secrets.mux`; its ID has a dot, so it is never readable through the public dataset. The website needs no Mux keys, because it only uses public playback IDs.

### Carousel

`frontend/src/features/sections/carousel/index.tsx` renders the title as an `h2`, then a [Blossom Carousel](https://www.blossom-carousel.com) list (`@blossom-carousel/react`), labelled by that heading. Each slide title is an `h3`. Blossom uses native scrolling with scroll snap and only loads its drag engine (`@blossom-carousel/core`) on devices with a fine pointer, so touch and trackpads scroll natively. The list has `tabIndex={0}` and the shared focus outline, because Blossom doesn't make the scroller focusable, so keyboard users can reach and scroll it even when no slide has a link. It also has `role="list"`, because `list-style: none` makes Safari drop the list semantics. Slide links pass through `SanityLink`. `blossom.ts` re-exports the component from a `"use client"` module, because the package has no directive; the small wrapper ships with every page that renders sections, and Blossom's stylesheet is global.

- The carousel runs from edge to edge of the screen with the `bleed` utility in `tailwind.css`, which sets `--gutter` to the container's side padding and pulls the wrapper out by it on both sides. The list has the same `--gutter` as `padding-inline` and `scroll-padding-inline`, so the first slide lines up with the container's left edge, scrolled slides run off both edges of the screen, and the last slide stops at the container's right edge. `html` has `overflow-x: clip`, so the bleed never causes a horizontal scrollbar.
- Slides are at most 28rem wide (80vw on small screens), snap to the start, and sit 1.5rem apart. Each shows its media in a rounded 16:10 frame with a `subtle` background, the title (a `nav` link with ↗ when it has a link), and the description in `muted`.
- The stylesheet is imported in `global.css` into the `components` layer. Its own `blossom-carousel` layer would otherwise come after Tailwind's `utilities` and override the slide layout.

### Link cards

`frontend/src/features/sections/link-cards.tsx` renders the Link cards section, modelled on x.ai's contact page, as on `/contact`: on the left an optional `muted` eyebrow, the `<h2>` with a heading link, and a short `muted` text; on the right a list of full-width `rounded-2xl` cards in `subtle` that darken to `subtle-hover` on hover. Each card shows its label on the left and a `muted` Lucide arrow on the right that turns `foreground`: `ArrowRight` for a path on this site, `ArrowUpRight` for anything else, such as `mailto:` or another site. Links pass through `safeHref()`, so a card with an unsafe link is left out. From the `site` breakpoint the text and the cards sit side by side, 4rem apart; the section uses the full container (`data-full`). In Markdown it becomes the heading, the text, and a list of links.

### List

`frontend/src/features/sections/list/index.tsx` renders an accordion, for example for a FAQ. The homepage used it for Experience before that became the About me text section. From the `site` breakpoint, the `h2`, with an optional second line in `muted` and an optional button below it, takes the left 27.5 of 66 parts of the row and is `sticky` below the header while the list scrolls past, like the FAQ on beside.com; the list takes the rest, 4rem away. Below it they stack.

The accordion is `list/accordion.tsx`, built on the ui-sdk `Accordion` ([its docs](https://ui-sdk.dev/docs/react/components/accordion)) and modelled on the FAQ on beside.com. Only one item is open at a time, the first by default. The root renders an `<ol>` and each item an `<li>`, through `render`. Each item is a rounded card:

- The row shows the period in `muted` and the title (an `h3`). With an organization it reads "UX Developer at Friday Digital Agency", and only the organization is the `nav` link; without one the whole title is. The link is 24px high, so it meets the WCAG target size on top of the button. `AccordionHeader` renders a `div` that holds the `h3` and the `AccordionTrigger`, a button under the whole row with `aria-expanded`, a screen-reader-only "More about …" and a plus icon at the right, so clicking anywhere on the row outside the link toggles it. The `h3` sits above the button with `pointer-events: none`; the link turns them back on. The heading can't hold the button, because the button would then contain the link.
- The panel has the description and location in `muted` and the tags as small pills in the page colour, in a list labelled "Skills". `hiddenUntilFound` keeps closed panels in the HTML and lets the browser's Find open them.
- Opening and closing take 200ms with `ease-out`: the card fades to `subtle` (`data-open`), the plus turns 45° into a cross, and the panel animates its height between 0 and `--accordion-panel-height`, using ui-sdk's `data-starting-style` and `data-ending-style`. The global reduced-motion rule in `animations.css` makes them instant.

The first item is open in the server HTML; the others are hidden until the page has loaded. In Markdown each item is a bullet that starts with its period.

## Settings

Site-wide content lives in the `settings` singleton (`studio/schemas/documents/settings.ts`), registered with `defineSingleton` in `studio/sanity.config.ts` and shown at the top of the Studio. It holds the role shown under the name in the header, and the header navigation (references to `page` documents, in order). `frontend/src/features/site/fetch.ts` reads it with `getSettings()`; the header marks the link whose URI matches the current path, or one of its parents, as current.

Interface text that isn't content, such as the skip link, copy-button labels, the article call to action and the 404 text, is hardcoded in the component that uses it.

## Profile metadata

Profile details appear on the homepage (including its hero) and Settings in Sanity, `frontend/src/features/pages/metadata.ts` (metadata and JSON-LD), `frontend/src/app/llms.txt/route.ts`, and `frontend/src/app/manifest.ts`. Keep those details aligned when changing them.
