# Deployment

The site is deployed on [Vercel](https://vercel.com) as a Next.js project (`vercel.json`). Bun runs locally and on the host; the Node.js version is pinned in `.nvmrc` and `package.json` `engines`.

## Flow

1. Work on a short branch off `main`, such as `bios-ui-sdk`.
2. Every push to a pull request gets a Vercel preview deployment. Review the change there.
3. Squash-merge the pull request. Vercel deploys `main` to production at https://www.kevinpierik.dev.

Run `bun run qa` before you push. It checks formatting, lints, type-checks, runs the tests, and builds the site. Every route must build as static (`○`).

## Branch protection

A GitHub ruleset named "Protect main" blocks direct pushes, force pushes, and deletion of `main`, and only allows squash-merged pull requests. Repository admins can bypass it in an emergency. Merged branches are deleted automatically.

## Environment

No environment variables are required. `.env.example` documents any that are added later; local values go in `.env.local`. Vercel Analytics and Speed Insights only load when `VERCEL_ENV` is set, so local builds stay free of tracking.

## Security headers

`next.config.ts` sends these headers on every route:

| Header                      | Value                                          |
| --------------------------- | ---------------------------------------------- |
| `X-Content-Type-Options`    | `nosniff`                                      |
| `Referrer-Policy`           | `strict-origin-when-cross-origin`              |
| `Permissions-Policy`        | `camera=(), microphone=(), geolocation=()`     |
| `Strict-Transport-Security` | `max-age=63072000; includeSubDomains; preload` |

## Search Console

`kevinpierik.dev` is a domain property in Google Search Console, verified through DNS, so no verification meta tag is needed. The sitemap at `/sitemap.xml` is submitted there.
