---
name: content/profile-details-sync
rubric: seo
severity: blocking
paths:
  - "frontend/src/features/pages/metadata.ts"
  - "frontend/src/features/site/**"
  - "frontend/src/app/llms.txt/**"
  - "frontend/src/app/manifest.ts"
  - "frontend/src/app/**/opengraph-image.tsx"
  - "studio/schemas/documents/settings.ts"
---

# Profile details change together

**Rule.** Profile details (name, role, employer, location, contact, social profiles) are repeated in several places. Change them all in the same pull request.

## Look for

A change to any of these without the matching change in the others:

- Sanity content: the homepage and other pages, and the `settings` document (role, navigation, colophon).
- `frontend/src/features/pages/metadata.ts`: metadata and the `Person` JSON-LD, including `sameAs`.
- `frontend/src/app/llms.txt/route.ts`.
- `frontend/src/app/manifest.ts`.
- `frontend/src/features/site/social-links.ts` and `frontend/src/features/site/index.ts`.
- `frontend/src/app/opengraph-image.tsx`, which shows the name and role.

## Do not flag

- Changes to page body text that don't touch profile facts.

## Why

Search engines and AI crawlers cross-check these sources. Conflicting job titles or a missing profile in `sameAs` weaken the name ranking. See [SEO](../../../docs/frontend/seo-and-structured-data.md).

## Example

Bad: a new employer in the Sanity homepage while `metadata.ts` still names the old one in `worksFor`.

Good: one pull request that updates Sanity, `worksFor` in `metadata.ts`, and the line in `llms.txt`.
