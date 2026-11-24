# Studio

The Sanity Studio source lives in `studio/`; the hosted Studio is managed by Sanity. Studio-specific schemas and configuration are in this workspace.

## Content model

- The `settings` singleton holds site-wide content: role and header navigation. It has a fixed `settings` ID, is registered with `defineSingleton` in `sanity.config.ts`, and opens directly from the top of the Studio.
- `page` documents represent standalone pages, including Home (`/`) and Posts (`/posts`). Their visible content is a list of sections (text, media, carousel) in the Content tab; title and URI are in the Page tab and metadata in the SEO tab.
- `article` documents represent dated, long-form posts. Their content is a list of sections: text, media, code, table, and carousel. Media can be an image or a Mux video; see [Mux setup](../frontend/pages-and-sections.md#mux-setup).
- Pages and articles use separate schemas because their content and publishing needs differ.
- SEO fields are defined in `studio/schemas/fields/create-seo-field.ts` and used by both page and article schemas. Fill them in for authored content where appropriate, especially on the homepage.

Schemas live in `studio/schemas/documents/`, and reusable field factories in `studio/schemas/fields/`. The document lists and navigation are configured in `studio/structure.tsx`.

For the frontend behavior driven by this content, see [pages and sections](../frontend/pages-and-sections.md), [Posts](../frontend/posts.md), and [SEO](../frontend/seo-and-structured-data.md).

## Development

Copy `studio/.env.example` to `studio/.env.local` to set the Studio's project ID and dataset. These public settings are read by both `sanity.config.ts` and `sanity.cli.ts`; never put API tokens in `SANITY_STUDIO_` variables.

Run `bun run dev:studio` from the repository root to start the local Studio. Run `bun --filter studio deploy` to deploy it to Sanity hosting. After changing a schema or GROQ query, run `bun run typegen` and commit the generated schema and frontend types.
