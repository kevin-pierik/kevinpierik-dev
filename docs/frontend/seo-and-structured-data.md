# SEO and structured data

The homepage, in English at `/` and in Dutch at `/nl`, aims to be the first result for "Kevin Pierik" and to give search engines a complete, consistent picture of the person behind it.

## Metadata

`pageMetadata()` in `frontend/src/features/pages/metadata.ts` builds the metadata for every page. A page's `seo` fields in Sanity win; the homepages fall back to the dictionaries in `frontend/src/features/i18n/`:

- The title leads with the name, `Kevin Pierik | Frontend Developer`, because that is what people search for.
- A description, a canonical URL per language, and `hreflang` alternates for `en`, `nl`, and `x-default` (English).
- `author`, `creator`, `publisher`, `application-name`, `category`, and `copyright`. The copyright year comes from the build date.
- Open Graph as a `profile` (first name, last name, username), and a large Twitter card. Other pages are an Open Graph `website`. The image comes from `frontend/src/app/(web)/[locale]/opengraph-image.tsx` (see below). Next.js merges `openGraph` shallowly, so declare the complete object.
- `robots` allows indexing with large image previews.

`og:locale` follows the page's language (`en_US` or `nl_NL`), with the other one as `og:locale:alternate`.

## Structured data

Each page renders a JSON-LD `@graph`, typed with `schema-dts`, through `frontend/src/components/json-ld.tsx`:

- **WebSite**: its name, description, and both languages, with the person as publisher and copyright holder.
- **ProfilePage**: the page in its own language, with the person as its main entity.
- **Person**: name parts, contact details, address, occupation, nationality, languages, employer (Friday Digital Agency, with its URL), schools, skills, and `sameAs` links to LinkedIn, Instagram, and GitHub.

Google Search Console reports the result under Enhancements, Profile page.

## Blog

`frontend/src/features/posts/seo.ts` builds the blog's metadata and JSON-LD the same way:

- The blog index is an Open Graph `website` with a `Blog` JSON-LD node that lists its posts as `BlogPosting` items.
- A post is an Open Graph `article` with `publishedTime`, `modifiedTime`, and the author, and a `BlogPosting` node with its headline, dates, language, author (`#person`), and the website (`#website`) it is part of.
- Canonicals and `hreflang` alternates only list the languages a post exists in.
- Blog pages use the same Open Graph image as every page in the language.

The site URL, name, and the `#person` and `#website` ids live in `frontend/src/features/site/index.ts`.

## Open Graph image

`frontend/src/app/(web)/[locale]/opengraph-image.tsx` draws a 1200×630 PNG per language in the site's style: the name and role at the top left, `kevinpierik.dev` at the bottom, in Geist Sans on white. It reads the Geist TTF files from the `geist` package, because the image renderer can't read woff2. `generateStaticParams` prerenders both images at build time, and Next.js adds the `og:image` and `twitter:image` tags itself, so the metadata declares no images.

## Other files

- `frontend/src/app/sitemap.ts` lists both homepages, both blog indexes, and every published post, each with its language alternates and posts with `lastModified`. Its URLs match the canonicals exactly, so the English page has no trailing slash.
- `frontend/src/app/robots.ts` allows everything except `/api/` and points to the sitemap.
- `frontend/src/app/manifest.ts` serves `/manifest.webmanifest` with the name and icons.

## Off-site signals

Ranking for a name depends mostly on what links to the site. Keep the profiles in `sameAs` linking back to https://www.kevinpierik.dev, and add new profiles to `sameAs` and `llms.txt`.
