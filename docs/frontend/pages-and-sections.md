# Pages and sections

Pages, the CV homepage included, are `page` documents in Sanity, one per language, built from sections. The Studio groups Pages and Articles separately, then offers language-filtered lists for each type. Translations stay as linked documents so each language can have its own URI, draft, and publish state; the page and article types remain separate because pages use reusable sections while articles have a dated, long-form body. `frontend/src/app/(web)/[locale]/[[...uri]]/page.tsx` renders every page.

## The page model

`studio/schemas/documents/page.ts` has a hidden `language`, a `title`, a `uri`, an optional `seo` object, and `sections`.

- `uri` is the full public path, language prefix included: `/` and `/nl` are the homepages, `/about` and `/nl/over` other pages. `createUriField()` fills it from the title, checks that it starts with the language's prefix, and keeps it unique. `studio/slug.ts` holds the helpers, shared with the site.
- `frontend/src/features/pages/uri.ts` maps a URI to the route segments of `[[...uri]]` and back, and recognises a homepage.
- `generateStaticParams` lists every published page in the language, so each page is prerendered and other paths show the [404 page](not-found.md) (`dynamicParams = false`).
- On a homepage, the name in the [site header](layout.md) is the `<h1>` and the page renders the profile JSON-LD. Other pages show their title as the `<h1>`.

## Sections

`createPageBuilder()` lists the section types in `studio/schemas/sections/`, and `frontend/src/features/sections/index.tsx` renders each one with its component:

- **Intro** (`introSection`): muted opening paragraphs.
- **Entries** (`entriesSection`): a titled list of jobs or schools. Each entry has a title, an optional company and website, a start date, an end date or "current", a location, and a description. The heading reads "role at company", with "at" or "bij" from the dictionaries; with a website, only the company is a `nav` link with `↗`. Dates show as years, with "Present" or "heden" for current entries.
- **Text** (`textSection`): a titled block of paragraphs, such as Skills.
- **Rows** (`rowsSection`): titled label and value rows, such as Contact and Socials. With `address`, the rows sit in an `<address>`.

Section titles render as `<h2>` with a colon and an id from the title; entries render as `<h3>`. Links from Sanity go through `SanityLink`, which only renders `http`, `https`, `mailto`, `tel`, and internal links (`safeHref()`, with tests).

## Styling

From 800px, sections, entries, and rows are full-width `grid-site` grids ([Layout](layout.md#grid)): titles and intros span columns 3–10, years and labels sit in columns 3–4, and content in columns 5–10, with no rules. Below 800px the years sit above the title and rows use a 7rem label column. Spacing is set in `lh`: the first section starts 6 lines below the intro, sections are 3 lines apart, and entries and paragraphs one line apart.

## Moving the CV into Sanity

`studio/scripts/seed-home.ts` creates the English and Dutch homepages with the CV content, localized SEO titles and descriptions, and links them as translations. Run it once with `bun --filter studio seed`; it skips pages that already exist.

## Keeping details in sync

Profile details appear in the homepages in Sanity, `frontend/src/features/pages/metadata.ts` (metadata and JSON-LD), the dictionaries in `frontend/src/features/i18n/`, `frontend/src/app/llms.txt/route.ts`, and `frontend/src/app/manifest.ts`. When you change one, change the others, and keep the two languages saying the same thing.
