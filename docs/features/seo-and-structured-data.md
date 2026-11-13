# SEO and structured data

The homepage, in English at `/` and in Dutch at `/nl`, aims to be the first result for "Kevin Pierik" and to give search engines a complete, consistent picture of the person behind it.

## Metadata

`generateMetadata` in `app/[lang]/page.tsx` builds the metadata for both pages, from the dictionaries in `features/i18n/`:

- The title leads with the name, `Kevin Pierik | Frontend Developer`, because that is what people search for.
- A description, a canonical URL per language, and `hreflang` alternates for `en`, `nl`, and `x-default` (English).
- `author`, `creator`, `publisher`, `application-name`, `category`, and `copyright`. The copyright year comes from the build date.
- Open Graph as a `profile` (first name, last name, username), and a large Twitter card. The image comes from `app/[lang]/opengraph-image.tsx` (see below). Next.js merges `openGraph` shallowly, so declare the complete object.
- `robots` allows indexing with large image previews.

`og:locale` follows the page's language (`en_US` or `nl_NL`), with the other one as `og:locale:alternate`.

## Structured data

Each page renders a JSON-LD `@graph`, typed with `schema-dts`, through `components/json-ld.tsx`:

- **WebSite**: its name, description, and both languages, with the person as publisher and copyright holder.
- **ProfilePage**: the page in its own language, with the person as its main entity.
- **Person**: name parts, contact details, address, occupation, nationality, languages, employer (Friday Digital Agency, with its URL), schools, skills, and `sameAs` links to LinkedIn, Instagram, and GitHub.

Google Search Console reports the result under Enhancements, Profile page.

## Open Graph image

`app/[lang]/opengraph-image.tsx` draws a 1200×630 PNG per language in the site's style: the name and role at the top left, `kevinpierik.dev` at the bottom, in Geist on white. It reads the Geist TTF files from the `geist` package, because the image renderer can't read the woff2 that `next/font` serves. `generateStaticParams` prerenders both images at build time, and Next.js adds the `og:image` and `twitter:image` tags itself, so the metadata declares no images.

## Other files

- `app/sitemap.ts` lists both pages with `en`, `nl`, and `x-default` alternates. Its URLs match the canonicals exactly, so the English page has no trailing slash.
- `app/robots.ts` allows everything except `/api/` and points to the sitemap.
- `app/manifest.ts` serves `/manifest.webmanifest` with the name and icons.

## Off-site signals

Ranking for a name depends mostly on what links to the site. Keep the profiles in `sameAs` linking back to https://www.kevinpierik.dev, and add new profiles to `sameAs` and `llms.txt`.
