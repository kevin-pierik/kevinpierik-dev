# Deployment

The frontend is deployed on [Vercel](https://vercel.com) from the `frontend/` workspace (`frontend/vercel.json`). Set the Vercel project's Root Directory to `frontend`. Bun runs from the monorepo root, and the Node.js version is pinned in `.nvmrc` and the workspace `engines` fields.

## Flow

1. Work on a short branch off `main`, such as `bios-ui-sdk`.
2. Every push to a pull request gets a Vercel preview deployment. Review the change there.
3. Squash-merge the pull request. Vercel deploys `main` to production at https://www.kevinpierik.dev.

Run `bun run qa` before you push. GitHub Actions runs formatting, lint, typecheck, generated Sanity artifact checks, Vitest, and the frontend/Studio builds. The frontend build job runs Playwright end-to-end tests against the production build in Chromium and uploads an HTML report. Independent checks run in parallel, and a final `CI passed` job verifies they all succeeded. Checks run on every pull request and push to `main`, using the frozen Bun lockfile. Every frontend page must build as static: `○`, or `●` for prerendered localized pages; only the proxy is `ƒ`.

## Branch protection

A GitHub ruleset named "Protect main" blocks direct pushes, force pushes, and deletion of `main`, and only allows squash-merged pull requests. Repository admins can bypass it in an emergency. Merged branches are deleted automatically.

## Environment

The blog reads posts from Sanity, so the build needs `NEXT_PUBLIC_SANITY_PROJECT_ID` and `NEXT_PUBLIC_SANITY_DATASET`, in Vercel and in `frontend/.env.local`. Both are public; `frontend/.env.example` lists their values. No token is needed, because the site only reads published content ([Blog](frontend/blog.md)). Vercel Analytics and Speed Insights only load when `VERCEL_ENV` is set, so local builds stay free of tracking.

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
