# Studio

The Sanity Studio source lives in `studio/`; the hosted Studio is managed by Sanity. Studio-specific schemas and configuration are in this workspace.

## Content model

- `page` documents represent standalone pages, including the CV homepages. They contain reusable page sections.
- `article` documents represent dated, long-form blog posts. They have a Portable Text body and can include rich media, code, and tables.
- Pages and articles use separate schemas because their content and publishing needs differ. Each language is a separate document linked through `@sanity/document-internationalization`; a translation can have its own slug, draft, and publishing state.
- SEO fields are defined in `studio/schemas/fields/create-seo-field.ts` and used by both page and article schemas. Fill them in for authored content where appropriate; the frontend has homepage defaults.

Schemas live in `studio/schemas/documents/`, reusable field factories in `studio/schemas/fields/`, and page section types in `studio/schemas/sections/`. The document lists and navigation are configured in `studio/structure.tsx`.

For the frontend behavior driven by this content, see [pages and sections](../frontend/pages-and-sections.md), [Posts](../frontend/posts.md), [languages](../frontend/languages.md), and [SEO](../frontend/seo-and-structured-data.md).

## Development

Copy `studio/.env.example` to `studio/.env.local` to set the Studio's project ID and dataset. These public settings are read by both `sanity.config.ts` and `sanity.cli.ts`; never put API tokens in `SANITY_STUDIO_` variables.

Run `bun run dev:studio` from the repository root to start the local Studio. Run `bun --filter studio deploy` to deploy it to Sanity hosting. After changing a schema or GROQ query, run `bun run typegen` and commit the generated schema and frontend types.
