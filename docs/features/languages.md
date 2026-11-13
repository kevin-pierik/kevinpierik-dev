# Languages

The site is in English at `/` and in Dutch at `/nl`. Both pages are static and say the same thing. The setup follows the Next.js [internationalization guide](https://nextjs.org/docs/app/guides/internationalization), apart from the URL of the default language.

## Routing

- Everything with a language lives in `app/[lang]/`. Its `layout.tsx` is the root layout: it sets `<html lang>`, lists `en` and `nl` in `generateStaticParams`, and sets `dynamicParams = false`, so any other first segment, such as `/fr`, shows the BIOS 404.
- English stays at `/`, the existing canonical URL. `next.config.ts` rewrites `/` to `/en` and permanently redirects `/en` to `/`, so there is one URL per language and no proxy.
- The build lists the pages as `●` (prerendered through `generateStaticParams`), which is still static HTML.

## Dictionaries

`features/i18n/` holds one JSON dictionary per language with every UI string outside the MDX: titles, descriptions, the role, `aria-label`s, and the colophon. `getLocale()` reads the language with `next/root-params`, so any Server Component can call it without props, and `getDictionary(locale)` returns its strings. TypeScript fails if a dictionary misses a key that English has.

The CV itself is not in the dictionaries; each language has its own `home.en.mdx` or `home.nl.mdx`.

## Language switcher

The footer lists English and Nederlands. Each link has `hreflang` and `lang`, so screen readers pronounce the name in its own language, and the current language has `aria-current="page"` and full contrast. Switching languages lands on the top of the other page.

## Search engines

Both pages declare `hreflang` alternates for `en`, `nl`, and `x-default`, and the sitemap lists both. See [SEO and structured data](seo-and-structured-data.md).

## Adding or changing text

Change both `home.*.mdx` files together, and add new UI strings to both dictionaries.
