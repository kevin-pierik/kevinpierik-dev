# MDX content

The CV is written as markdown in `app/(web)/home.mdx` and rendered by `app/(web)/page.tsx`, which owns `<main>`, the metadata, and the structured data. The `<h1>` lives in the [site header](layout.md).

## Writing content

- `<Intro>` wraps the opening paragraphs in muted text.
- `<Section title="…">` renders a `<section>` labelled by an `<h2>` whose id is slugified from the title. The heading shows the title with a colon, such as "Experience:".
- `<Entry title="…" start="2024-09" end="2025-01">` renders one row: the years on the left, an `<h3>` with the title on the right, and its children as muted details below the title. Below the `sm` breakpoint the years move above the title. `end="present"` shows "Present"; leave `end` out for a single date. Dates are wrapped in `<time>` for you.
- `<Contact>` wraps a list in `<address>`, and each item becomes a two-column row. Start each item with `<Label>`, which renders the muted left column.
- `<time dateTime="P5M">5 months</time>` marks durations in the text.

The MDX has no Tailwind classes; every style lives in the components.

## Styling

All element styles and the components above live in `mdx-components.tsx`. Markdown links render through `Link`. See [Links and buttons](links-and-buttons.md).

Rows are a grid with a 7rem left column and no rules. Spacing is set in `lh`, the line height: the first section starts 6 lines below the intro, sections are 3 lines apart, and rows and paragraphs are one line apart. Rows and contact items are grids, so the line break Prettier puts after `<Label>` doesn't render as a space.

## Keeping details in sync

Profile details appear in `home.mdx`, the site header, the page metadata, the structured data, and `llms.txt`. When you change one, change the others.
