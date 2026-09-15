# kevinpierik.dev

The source for [kevinpierik.dev](https://www.kevinpierik.dev): a fast, one-page professional profile and curriculum vitae for Kevin Pierik.

## Stack

- Astro 7, with static prerendering for the public profile
- React only for the embedded Sanity Studio at `/studio`
- Tailwind CSS 4
- Sanity Studio 6
- Vercel

## Project structure

The project follows Astro’s `src/` convention while retaining feature ownership inspired by the supplied reference:

```text
src/
├── features/    # Domain UI, SEO structured data, styles, and Studio bridge
├── layouts/     # Shared document shells and metadata
└── pages/       # File-based routes and static SEO endpoints
```

`src/pages/index.astro`, the 404 screen, `robots.txt`, `sitemap.xml`, and `llms.txt` are prerendered. The dormant Sanity Studio is the only on-demand route.

## Development

```bash
bun install
cp .env.example .env.local
bun run dev
```

The site is available at [http://localhost:4321](http://localhost:4321). It renders without Sanity configuration because public content is code-based.

Run the full quality and production-build check before committing:

```bash
bun run qa
```

## Environment

The current profile content and canonical site metadata are hardcoded at their points of use until a Sanity content model is introduced. See `structure.md` for the planned migration boundaries.

Sanity is intentionally dormant: the Studio remains available at `/studio`, but public rendering does not fetch from it. Configure the optional `PUBLIC_SANITY_*` values in `.env.local` only when a content model is introduced.
