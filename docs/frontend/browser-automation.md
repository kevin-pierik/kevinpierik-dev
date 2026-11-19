# Browser testing and automation

[Playwright](https://playwright.dev/) runs the automated end-to-end suite against the production build. The suite covers localized navigation, the blog's empty state or an article opened from the index, the localized 404, and public discovery routes. GitHub Actions builds the frontend, starts it with `next start`, and runs these checks in Chromium.

Install Chromium once, then run the full local quality suite with the public Sanity environment values set:

```bash
bunx playwright install chromium
NEXT_PUBLIC_SANITY_PROJECT_ID=v3zmx1mq NEXT_PUBLIC_SANITY_DATASET=production bun run qa
```

The end-to-end step runs after the production build. Playwright waits for the production server's `/en` route, then tests the public root route and uses published production content; it never writes to Sanity. When an English article is published, the test follows it from the index and checks its date and JSON-LD. With no published English articles, it checks the empty state.

To target an accessible deployment, set `PLAYWRIGHT_TEST_BASE_URL`. This skips the local server, so the same suite can be used against a public Vercel preview:

```bash
PLAYWRIGHT_TEST_BASE_URL=https://your-preview-url.vercel.app bun run test:e2e
```

[`agent-browser`](https://github.com/vercel-labs/agent-browser) remains available for exploratory checks and manual accessibility audits.

## Setup

```bash
bunx agent-browser install
```

This downloads its own Chrome to `~/.agent-browser/`.

## Examples

Build and start the site, then:

```bash
bunx agent-browser open http://localhost:3000/does-not-exist
bunx agent-browser press F1
bunx agent-browser get url
bunx agent-browser a11y http://localhost:3000/ --tags wcag2a,wcag2aa,wcag21aa,wcag22aa,best-practice
bunx agent-browser close
```

The `a11y` command runs an axe-core audit.
