# llms.txt

`/llms.txt` gives language models a short plain-text summary of the site, following the [llms.txt proposal](https://llmstxt.org).

It is a static route handler in `app/llms.txt/route.ts` (`dynamic = "force-static"`) that lists the canonical page and the contact links. Like `robots.txt` and `sitemap.xml`, it must only point to canonical public content.

When profile details change, update `llms.txt` together with both `home.*.mdx` files, `app/[lang]/page.tsx`, and the dictionaries in `features/i18n/`. It links the Dutch page too.
