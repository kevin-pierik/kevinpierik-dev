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
├── features/    # Domain UI, content, site config, styles, and Studio bridge
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

Set `PUBLIC_SITE_URL` to the final HTTPS origin without a trailing slash. It drives canonical URLs, Open Graph URLs, `robots.txt`, `sitemap.xml`, and `llms.txt`.

Sanity is intentionally dormant: the Studio remains available at `/studio`, but public rendering does not fetch from it. Configure the optional `PUBLIC_SANITY_*` values in `.env.local` only when a content model is introduced.
