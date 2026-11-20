---
name: repo/commits-and-prs
rubric: process
severity: blocking
paths:
  - ".github/**"
---

# Commits and pull requests

**Rule.** Commits follow Zed's style: `area: Description`, imperative and sentence case, with no trailing period and no `Co-authored-by` trailers. Work happens on a short kebab-case branch off `main` and is squash-merged through a pull request that follows `.github/pull_request_template.md`.

## Look for

- Commit subjects like `fix stuff`, `Added posts page.`, or `feat(posts): …`.
- `Co-authored-by:` or other attribution trailers.
- Commits directly on `main`, or long-lived branches such as `develop`.
- A pull request body without the Summary, Testing, Self-review, and Release Notes sections.
- `bun run qa` not run, or `bun run format` not run before committing.

## Do not flag

- A subject without an area for a change that spans the whole project.

## Why

The squashed subject is the changelog. See [deployment](../../../docs/deployment.md).

## Example

Bad:

```
Fixed the posts index.

Co-authored-by: …
```

Good:

```
posts: Render the posts index from code instead of a Body block
```
