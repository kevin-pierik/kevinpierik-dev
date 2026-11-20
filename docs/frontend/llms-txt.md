# llms.txt

`/llms.txt` gives language models a short plain-text summary of the site, following the [llms.txt proposal](https://llmstxt.org).

It is a static route handler in `frontend/src/app/llms.txt/route.ts` (`dynamic = "force-static"`) that lists the canonical pages, the blog indexes, every published post, and the contact links. The posts are read from Sanity when the route is built. Like `robots.txt` and `sitemap.xml`, it must only point to canonical public content.

It lists every published page and article from Sanity, built when the route is built. When profile details change, update the contact links here together with the homepage in Sanity and Settings in Sanity, and `frontend/src/features/pages/metadata.ts`.
