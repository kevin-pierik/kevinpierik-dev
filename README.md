# kevinpierik.dev

The source for [kevinpierik.dev](https://www.kevinpierik.dev): a professional profile, curriculum vitae, and blog.

## Stack

- Next.js 16 App Router in `frontend/`, with statically prerendered routes
- Sanity Studio in `studio/`, with schemas and content tooling
- Bun workspaces for the frontend and Studio
- React Server Components, Tailwind CSS 4, and Geist
- Sanity for pages and articles
- ESLint, Prettier, and Vitest
- Vercel for the website and Sanity hosting for the Studio

## Project structure

```text
frontend/
  src/
    app/              # Localized routes and static route handlers
    components/       # Small, feature-agnostic building blocks
    features/         # Blog, pages, sections, Sanity integration, i18n, site, styles
  public/             # Frontend assets
  package.json
studio/
  schemas/            # Documents, fields, and page sections
  scripts/            # Content utilities
  package.json
  sanity.config.ts
  sanity.cli.ts
docs/                 # Deployment notes and feature documentation
.agents/skills/       # Repository skills for coding agents
package.json          # Bun workspace scripts
bun.lock
```

Every public page is a `page` document in Sanity. The English homepage is `/`, the Dutch homepage is `/nl`, and blog indexes are `/blog` and `/nl/blog`. The frontend serves English without a locale prefix. Sanity pages and articles have separate schemas and linked translations ([Pages and sections](docs/frontend/pages-and-sections.md), [Blog](docs/frontend/blog.md)). See the [Studio docs](docs/studio/README.md) for the content model and Studio setup.

## Development

```bash
bun install
bun run dev
```

This starts the frontend at [http://localhost:3000](http://localhost:3000) and the Studio at [http://localhost:3333](http://localhost:3333). For one workspace, use `bun run dev:frontend` or `bun run dev:studio`.

Copy `frontend/.env.example` to `frontend/.env.local` and `studio/.env.example` to `studio/.env.local` for the public Sanity project settings. The Studio uses the root Bun workspace; its scripts include `bun run typegen`, `bun --filter studio seed`, and `bun --filter studio deploy`.

Run the full quality check from the repository root:

```bash
bun run format
bun run qa
```

The tests live beside the code they cover. `bun run qa` checks formatting, lint, types, tests, and the frontend production build.

## License

The source code is available under the [MIT License](LICENSE). The CV content, name, and images are not covered by it and remain all rights reserved. See [CONTRIBUTING.md](CONTRIBUTING.md) to contribute.
