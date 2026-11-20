# Studio

The Sanity Studio source lives in `studio/`; the hosted Studio is managed by Sanity. Studio-specific schemas and configuration are in this workspace.

## Content model

- The `settings` singleton holds site-wide content: role, header navigation, and footer colophon. It has a fixed `settings` ID, is registered with `defineSingleton` in `sanity.config.ts`, and opens directly from the top of the Studio.
- `page` documents represent standalone pages, including Home (`/`), Contact, and Posts (`/posts`). Their direct Body field contains visible Portable Text content; metadata, title, and URI remain separate fields.
- `article` documents represent dated, long-form blog posts. They have a Portable Text body and can include rich media, code, and tables.
- Pages and articles use separate schemas because their content and publishing needs differ.
- SEO fields are defined in `studio/schemas/fields/create-seo-field.ts` and used by both page and article schemas. Fill them in for authored content where appropriate, especially on the homepage.

Schemas live in `studio/schemas/documents/`, and reusable field factories in `studio/schemas/fields/`. The document lists and navigation are configured in `studio/structure.tsx`.

For the frontend behavior driven by this content, see [pages and Body](../frontend/pages-and-sections.md), [Posts](../frontend/posts.md), and [SEO](../frontend/seo-and-structured-data.md).

## Development

Copy `studio/.env.example` to `studio/.env.local` to set the Studio's project ID and dataset. These public settings are read by both `sanity.config.ts` and `sanity.cli.ts`; never put API tokens in `SANITY_STUDIO_` variables.

Run `bun run dev:studio` from the repository root to start the local Studio. Run `bun --filter studio deploy` to deploy it to Sanity hosting. After changing a schema or GROQ query, run `bun run typegen` and commit the generated schema and frontend types.
