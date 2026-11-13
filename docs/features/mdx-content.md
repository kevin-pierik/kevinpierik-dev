# MDX content

The CV is written as markdown in `app/(web)/home.mdx` and rendered by `app/(web)/page.tsx`, which owns the `<h1>`, the header, the grid, the metadata, and the structured data.

## Writing content

- `###` for each entry (school, job, skill group), `-` lists for its details, and markdown links.
- `<Column className="…">` places content in the grid.
- `<Section title="…">` renders a `<section>` labelled by an `<h2>` whose id is slugified from the title.
- `<Contact>` wraps the contact list in `<address>`.
- `<Label title="Phone">P:</Label>` renders the hanging `P:` and `E:` labels. The visible abbreviation is hidden from assistive technology, which reads `title` instead.
- `<time dateTime="2023-09">September 2023</time>` marks dates, and `<time dateTime="P5M">5 months</time>` marks durations.

Only `Column` and `Section` take Tailwind classes in the MDX, and only for layout.

## Styling

All element styles and the components above live in `mdx-components.tsx`. Markdown links render through `Link`, the same component the header in `page.tsx` uses. See [Links and buttons](links-and-buttons.md).

## Keeping details in sync

Profile details appear in `home.mdx`, the page metadata, the structured data, and `llms.txt`. When you change one, change the others.
