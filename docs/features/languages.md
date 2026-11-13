# Languages

The site is in English at `/` and in Dutch at `/nl`. Both pages are static and say the same thing. The setup follows the Next.js [internationalization guide](https://nextjs.org/docs/app/guides/internationalization), apart from the URL of the default language.

## Routing

- Everything with a language lives in `app/[lang]/`. Its `layout.tsx` is the root layout: it sets `<html lang>`, lists `en` and `nl` in `generateStaticParams`, and sets `dynamicParams = false`, so any other first segment, such as `/fr`, shows the BIOS 404.
- English stays at `/`, the existing canonical URL. `app/(default-locale)/` is a second root layout whose `layout.tsx`, `page.tsx`, and `opengraph-image.tsx` re-export the `[lang]` files; there `lang()` returns `undefined`, so `getLocale()` falls back to English. `[lang]` only prerenders the other languages, and `next.config.ts` permanently redirects `/en` to `/`.
- Don't serve `/` through a rewrite to `/en`: on Vercel, Next.js's per-segment prefetch requests for `/` then return 404.
- The build lists `/` as `○` and `/nl` as `●` (prerendered through `generateStaticParams`); both are static HTML.

## Dictionaries

`features/i18n/` holds one JSON dictionary per language with every UI string outside the MDX: titles, descriptions, the role, `aria-label`s, and the colophon. `getLocale()` reads the language with `next/root-params`, so any Server Component can call it without props, and `getDictionary(locale)` returns its strings. TypeScript fails if a dictionary misses a key that English has.

The CV itself is not in the dictionaries; each language has its own `home.en.mdx` or `home.nl.mdx`.

## Language switcher

The footer lists English and Nederlands. Each link has `hreflang` and `lang`, so screen readers pronounce the name in its own language, and the current language has `aria-current="page"` and full contrast. Switching languages lands on the top of the other page.

## Search engines

Both pages declare `hreflang` alternates for `en`, `nl`, and `x-default`, and the sitemap lists both. See [SEO and structured data](seo-and-structured-data.md).

## Adding or changing text

Change both `home.*.mdx` files together, and add new UI strings to both dictionaries.
