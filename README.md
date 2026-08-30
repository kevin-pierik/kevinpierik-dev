# kevinpierik.dev

A one-page professional profile and curriculum vitae for **Kevin Pierik**, built
with Next.js and React. The public site has one canonical page at `/`, a
BIOS-style 404 for unknown URLs, and an embedded Sanity Studio at
`/studio` that is retained for future content work.

## Requirements

| Requirement | Version |
| --- | --- |
| Bun | 1.3.14, as pinned in `package.json` |
| Node.js | 22 or newer for supporting tooling |

## Local development

```bash
bun install
cp .env.example .env.local
bun dev
```

The site is available at [http://localhost:3000](http://localhost:3000). It
works without Sanity configuration because all public content is code-based.

## Quality checks

Run the following before committing or deploying:

```bash
bun run qa
bun run build
```

`qa` runs ESLint and TypeScript checks. The build confirms static routes,
metadata routes, and the retained Studio compile correctly.

## Public routes and SEO

| URL | Purpose | Indexing |
| --- | --- | --- |
| `/` | Canonical profile and CV | Allowed; the only sitemap entry |
| `/robots.txt` | Crawl rules | Allows `/`, disallows Studio and API paths |
| `/sitemap.xml` | Public URL inventory | Contains only `/` |
| `/llms.txt` | LLM-readable site summary | Lists the canonical homepage and contact links |
| Unknown path | BIOS-style 404 | Not indexed |

The homepage defines an explicit title, meta description, canonical URL, English
language alternate, Open Graph and Twitter defaults, and Schema.org
`WebSite`, `ProfilePage`, and `Person` JSON-LD. The site language and base URL
are centralised in `features/site/config.ts`.

## Heading and accessibility model

The page has one `<h1>` for Kevin Pierik. Its primary CV groups use `<h2>`, and
individual education, skill, and employment entries use `<h3>`. Deeper heading
levels are intentionally absent: a heading rank is added only when the content
has a real nested section, so ranks never skip merely for visual styling.

Semantic landmarks identify the main content, social navigation, and each CV
section. Links retain visible keyboard focus styles; grouped details use native
lists; and global reduced-motion rules respect user preferences.

## Sanity Studio

Sanity is intentionally **dormant**. The Studio route and minimal configuration
are kept so a content model can be added later, but the public page does not
fetch from Sanity and the Studio currently has no schemas.

To configure and deploy the Studio in the future, add its project settings to
`.env.local` and use the retained commands:

```bash
bun run sanity:login
bun run sanity:cors
bun run sanity:deploy
```

Do not connect public rendering, preview endpoints, or Sanity schemas until the
future content model is explicitly defined.

## Project structure

```text
app/
├── (site)/                # Homepage, shared metadata, and route-level 404
├── studio/                # Separate Studio root layout
├── global-error.tsx       # Emergency document-level error fallback
├── global-not-found.tsx   # BIOS-style unmatched-route document
├── llms.txt/route.ts      # Machine-readable site summary
├── robots.ts              # Crawl directives
└── sitemap.ts             # Canonical one-page sitemap
components/
└── json-ld.tsx            # Safe JSON-LD serialization
features/
├── bios/                  # 404 display and copy
├── resume/                # Homepage content and layout
├── sanity/                # Studio base-path constant
├── site/                  # Identity configuration and structured data
└── style/                 # Shared Tailwind and accessibility styles
sanity/
└── schemas/index.ts       # Empty, schema-ready Studio registry
env.ts                     # Environment-variable defaults
```

## Deployment

Deploy to Vercel as a Next.js project. Set `NEXT_PUBLIC_SITE_URL` to the final
HTTPS origin without a trailing slash, for example
`https://www.kevinpierik.dev`. This value drives `metadataBase`, canonical URLs,
Open Graph URLs, `robots.txt`, `sitemap.xml`, and `llms.txt`.

The optional `@vercel/speed-insights` script renders only on Vercel, preventing
local development requests from producing console errors.
