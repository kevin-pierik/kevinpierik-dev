# llms.txt and Markdown

The site serves its content as plain text and Markdown for language models and AI agents.

## llms.txt

`/llms.txt` gives language models a short plain-text summary of the site, following the [llms.txt proposal](https://llmstxt.org).

It is a static route handler in `frontend/src/app/llms.txt/route.ts` (`dynamic = "force-static"`) that lists the canonical pages, the posts index, every listed post, and the contact links. It points to `/llms-full.txt` and the per-post Markdown. The posts are read from Sanity when the route is built. Like `robots.txt` and `sitemap.xml`, it must only point to canonical public content.

Its title and summary line are `llmsHeader` in `frontend/src/features/site/index.ts`, shared with `/llms-full.txt`. The summary line is `siteDescription`, which the web manifest uses too. When profile details change, update them together with the other places listed in the profile-details rule: the homepage and Settings in Sanity, `frontend/src/features/pages/metadata.ts`, `frontend/src/app/manifest.ts`, `frontend/src/app/opengraph-image.tsx`, and `frontend/src/features/site/social-links.ts`.

## llms-full.txt

`/llms-full.txt` (`frontend/src/app/llms-full.txt/route.ts`, static) holds the full text of every page and every listed article as Markdown, one document per `# Title`, separated by `---`. Each document starts with its canonical URL. The `get_page` [WebMCP](webmcp.md) tool reads this format through `pageMarkdown()`, so update that function and its test when the separator or the `URL:` line changes.

## Markdown per post

Every article has a Markdown version at `/posts/<slug>/md` (`frontend/src/app/posts/[slug]/md/route.ts`, static, built for every slug; like the article page it sets `dynamicParams = true`, so a post published after the build has its Markdown too). The article page links to it with `<link rel="alternate" type="text/markdown">` through `alternates.types` in `frontend/src/features/posts/metadata.ts`. The response sends `X-Robots-Tag: noindex` so search engines index the HTML page, and the Markdown URLs stay out of the sitemap.

## Sections to Markdown

`sectionsToMarkdown()` in `frontend/src/features/sections/markdown.ts` turns the shared `sections` into Markdown, mirroring the renderer in `frontend/src/features/sections/index.tsx`. Text sections go through `@portabletext/markdown`, with internal links made absolute by `absoluteUrl()` from `frontend/src/features/site/index.ts`, which the sitemap and `llms.txt` use too. Images become `![alt](cdn url)`, videos their title, tables GFM tables, and carousels a link list. A new section type needs a `case` here as well as in the renderer. `articleMarkdown()` in `frontend/src/features/posts/markdown.ts` adds a post's title, URL, date, and description.
