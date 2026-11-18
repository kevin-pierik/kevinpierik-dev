# Languages

The site is in English at `/` and in Dutch at `/nl`. Both pages are static and say the same thing. The setup follows the Next.js [internationalization guide](https://nextjs.org/docs/app/guides/internationalization), apart from the URL of the default language.

## Routing

- Every page with a language lives in `app/(web)/[locale]/`, English included. Its `layout.tsx` is the root layout: it sets `<html lang>`, lists `en` and `nl` in `generateStaticParams`, and sets `dynamicParams = false`, so any other first segment, such as `/fr`, shows the 404 page.
- English has no prefix in public URLs. `proxy.ts` rewrites unprefixed paths to `/en/…` internally, redirects `/en/…` to the unprefixed path with a 308, and lets `/nl/…` through. The decision is a pure function, `proxyPath()` in `features/i18n/proxy-path.ts`, with tests. The proxy skips `_next` and every path with a dot, such as `robots.txt` and `feed.xml`, and lets `/en/opengraph-image…` through so Open Graph images don't take a redirect.
- Use `NextResponse.rewrite()` in the proxy. A rewrite in `next.config.ts` broke Next.js's per-segment prefetch for `/` on Vercel; the proxy forwards the RSC headers itself. Check prefetching on a Vercel preview after changing the proxy.
- Server Components read the language with `getLocale()`, which uses the `locale` root param. Route handlers, such as the Open Graph image, can't use root params yet, so they read `params.locale`.
- Every page is static: the build lists the localized pages as `●`, and only the proxy as `ƒ`.

## Dictionaries

`features/i18n/` holds one JSON dictionary per language with every UI string outside Sanity: titles, descriptions, the role, `aria-label`s, and the colophon. `getLocale()` reads the language with `next/root-params`, so any Server Component can call it without props, and `getDictionary(locale)` returns its strings. TypeScript fails if a dictionary misses a key that English has.

Page and blog content is not in the dictionaries; it lives in Sanity, one document per language ([Pages and sections](pages-and-sections.md), [Blog](blog.md)).

## Language switcher

The footer lists English and Nederlands in a ui-sdk `NavigationMenu`. Each link has `hreflang` and `lang`, so screen readers pronounce the name in its own language. The current language is marked `current`, which sets `aria-current="page"` and `data-current`, and `data-current` gives it full contrast. Switching languages lands on the top of the other page.

Pages pass the footer an `alternates` map built with `alternatePaths()` in `features/i18n/alternates.ts`. A page or an article links to its translation when Sanity has one; otherwise the switcher falls back to the other language's homepage, or for an article to the other language's blog.

## Search engines

Every page declares `hreflang` alternates through `languageAlternates()` in `features/i18n`, with `x-default` pointing to English when there is an English version. A blog post only lists the languages it exists in. The sitemap lists every page with the same alternates. See [SEO and structured data](seo-and-structured-data.md).

## Adding or changing text

Add new UI strings to both dictionaries. Pages and articles are written per language in Sanity and linked as translations; an article doesn't need one.
