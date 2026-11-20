---
name: repo/docs-follow-code
rubric: process
severity: blocking
paths:
  - "docs/**"
  - "frontend/src/**"
  - "studio/schemas/**"
  - "frontend/.env.example"
---

# Docs follow the code, not comments

**Rule.** A change to how a feature works updates its page in `docs/` in the same pull request. Lasting decisions go in `docs/`, not in explanatory code comments.

## Look for

- A changed feature (routes, metadata, Sanity schemas, colours, layout, deployment) whose `docs/` page still describes the old behaviour, file paths, or names.
- A new feature with no `docs/` page, or a page that isn't linked from `docs/README.md` or its section README.
- Comments that explain why code is the way it is (`// We do this because…`).
- A new environment value in `frontend/.env.local` that isn't documented in `frontend/.env.example`.
- Text that isn't in English, or a file name that isn't kebab-case.

## Do not flag

- Directives such as `// @ts-expect-error` or `// eslint-disable-next-line` with a short reason.
- JSDoc on exported types that editors show on hover, when it describes rather than explains history.

## Why

Agents and people read `docs/` before changing a feature. A stale page sends them in the wrong direction; a comment is only found by someone already reading that line.

## Example

Bad:

```ts
// Sanity's CDN is skipped because previews need fresh data
const client = createClient({ useCdn: false });
```

Good: drop the comment and add the reason to the Sanity section of `docs/frontend/`.
