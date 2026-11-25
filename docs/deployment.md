# Deployment

The frontend is deployed on [Vercel](https://vercel.com) from the `frontend/` workspace (`frontend/vercel.json`). Set the Vercel project's Root Directory to `frontend`. Bun runs from the monorepo root, and the Node.js version is pinned in `.nvmrc` and the workspace `engines` fields.

## Flow

1. Work on a short branch off `main`, such as `bios-ui-sdk`.
2. Every push to a pull request gets a Vercel preview deployment. Review the change there.
3. Squash-merge the pull request. Vercel deploys `main` to production at https://www.kevinpierik.dev. When the change touches `studio/`, the `Deploy Studio` workflow also deploys the Studio to https://kevinpierik.sanity.studio ([Studio](studio/README.md)).

Run `bun run qa` before you push. GitHub Actions runs formatting, lint, typecheck, generated Sanity artifact checks, Vitest, and the frontend/Studio builds. The frontend build job runs Playwright end-to-end tests against the production build in Chromium and uploads an HTML report. Independent checks run in parallel, and a final `CI passed` job verifies they all succeeded. Checks run on every pull request and push to `main`, using the frozen Bun lockfile.

## Publishing content

Pages are built from Sanity content at deploy time. A Sanity webhook calls a Vercel Deploy Hook whenever a `page`, `article`, or `settings` document is published, changed, or deleted, so production rebuilds about a minute after you publish. A new article is also served on its first request before then, because its route sets `dynamicParams = true` ([Posts](frontend/posts.md#pages)).

To set it up:

1. In Vercel, open the project's **Settings → Git → Deploy Hooks** and create a hook named `sanity` for the `main` branch. Copy its URL; it is a secret, so keep it out of the repository.
2. In [sanity.io/manage](https://www.sanity.io/manage), open the project, then **API → Webhooks**, and create a webhook:
   - URL: the Deploy Hook URL
   - Dataset: `production`
   - Trigger on: create, update, and delete
   - Filter: `_type in ["page", "article", "settings"]`
   - Drafts and versions: off
   - HTTP method: `POST`, with no projection

## Branch protection

A GitHub ruleset named "Protect main" blocks direct pushes, force pushes, and deletion of `main`, and only allows squash-merged pull requests. Repository admins can bypass it in an emergency. Merged branches are deleted automatically.

## Dependency updates

[Renovate](https://docs.renovatebot.com) (`renovate.json`) opens dependency pull requests weekly. Minor and patch updates share one pull request, `deps: Update minor and patch dependencies`; each major update gets its own, such as `deps: Update eslint to v10`. Semantic commits are disabled so titles keep the `area: Description` style and become the squash commit unchanged. TypeScript is held below 7 until `typescript-eslint` supports it. Renovate runs through the Mend Renovate GitHub App.

## Environment

The site reads pages and posts from Sanity, so the build needs `NEXT_PUBLIC_SANITY_PROJECT_ID` and `NEXT_PUBLIC_SANITY_DATASET`, in Vercel and in `frontend/.env.local`. Both are public: `v3zmx1mq` and `production`. No token is needed, because the site only reads published content ([Posts](frontend/posts.md)). Vercel Analytics and Speed Insights only load when `VERCEL_ENV` is set, so local builds stay free of tracking.

## Security headers

`frontend/next.config.ts` sends these headers on every route:

| Header                      | Value                                          |
| --------------------------- | ---------------------------------------------- |
| `X-Content-Type-Options`    | `nosniff`                                      |
| `Referrer-Policy`           | `strict-origin-when-cross-origin`              |
| `Permissions-Policy`        | `camera=(), microphone=(), geolocation=()`     |
| `Strict-Transport-Security` | `max-age=63072000; includeSubDomains; preload` |

## Search Console

`kevinpierik.dev` is a domain property in Google Search Console, verified through DNS, so no verification meta tag is needed. The sitemap at `/sitemap.xml` is submitted there.
