# MDX content

The CV is written as markdown twice: in English in `app/[lang]/home.en.mdx` and in Dutch in `app/[lang]/home.nl.mdx` ([Languages](languages.md)). `app/[lang]/page.tsx` renders the file for the current language inside `<main>`. The `<h1>` lives in the [site header](layout.md).

## Writing content

- `<Intro>` wraps the opening paragraphs in muted text.
- `<Section title="…">` renders a `<section>` labelled by an `<h2>` whose id is slugified from the title. The heading shows the title with a colon, such as "Experience:".
- `<Entry title="…" start="2024-09" end="2025-01" location="…">` renders one row, as on nunocoelho.me: the years on the left; on the right an `<h3>` with the title, then the optional children as a muted description, then the location. With `href`, the title becomes a `nav` link with `↗`. `end` is either a date or a label for an ongoing entry, such as `end="Present"` or `end="heden"`; leave it out for a single date. Dates are wrapped in `<time>` for you. Write descriptions only from real details; don't pad them.
- `<Contact>` wraps a list in `<address>`, and each item becomes a two-column row. Start each item with `<Label>`, which renders the muted left column.
- `<time dateTime="P5M">5 months</time>` marks durations in the text.

The MDX has no Tailwind classes; every style lives in the components.

## Styling

All element styles and the components above live in `mdx-components.tsx`. Markdown links render through `Link`. See [Links and buttons](links-and-buttons.md).

From 800px, rows are a grid like nunocoelho.me's: a 15.725% column for the years, a 1.75% gap, and the rest for the content, with no rules. Below 800px the years sit above the title. Spacing is set in `lh`, the line height: the first section starts 6 lines below the intro, sections are 3 lines apart, and rows and paragraphs are one line apart. Rows and contact items are grids, so the line break Prettier puts after `<Label>` doesn't render as a space.

## Keeping details in sync

Profile details appear in both `home.*.mdx` files, `app/[lang]/page.tsx`, the dictionaries in `features/i18n/`, and `llms.txt`. When you change one, change the others, and keep the two languages saying the same thing.
