# SEO and structured data

The English homepage at `/` aims to be the first result for "Kevin Pierik" and to give search engines a complete, consistent picture of the person behind it.

## Metadata

`pageMetadata()` in `frontend/src/features/pages/metadata.ts` builds the metadata for every page. A page's `seo` fields in Sanity win; without them the title is the page title with the site name (the homepage uses the site name alone) and there is no description. Fill in the homepage SEO fields:

- The title leads with the name, `Kevin Pierik | Frontend Developer`, because that is what people search for.
- A description and a canonical URL.
- `author`, `creator`, `publisher`, `application-name`, `category`, and `copyright`. The copyright year comes from the build date.
- Open Graph as a `profile` (first name, last name, username), and a large Twitter card. Other pages are an Open Graph `website`. The image comes from `frontend/src/app/(web)/opengraph-image.tsx` (see below). Next.js merges `openGraph` shallowly, so declare the complete object.
- `robots` allows indexing with large image previews.

`og:locale` is `en_US`.

## Structured data

Each page renders a JSON-LD `@graph`, typed with `schema-dts`, through `frontend/src/components/json-ld.tsx`:

- **WebSite**: its name and description in English, with the person as publisher and copyright holder.
- **ProfilePage**: the English homepage, with the person as its main entity.
- **Person**: name parts, contact details, address, occupation, nationality, languages, employer (Friday Digital Agency, with its URL), schools, skills, and `sameAs` links to LinkedIn, Instagram, and GitHub.

Google Search Console reports the result under Enhancements, Profile page.

## Posts

`frontend/src/features/posts/metadata.ts` builds the metadata and JSON-LD for `/posts` and its articles the same way:

- The posts index uses the `/posts` page's metadata, like any other page. It adds a `Blog` JSON-LD node with that page's URL and SEO title, listing its posts as `BlogPosting` items. `/feed.xml` takes its channel title and description from the same page.
- A post is an Open Graph `article` with `publishedTime`, `modifiedTime`, and the author, and a `BlogPosting` node with its headline, dates, language, author (`#person`), and the website (`#website`) it is part of. Optional `seo.title` and `seo.description` fields set the page, Open Graph, and Twitter metadata; they fall back to the post title with the site name and the post description.
- Canonicals use the site's public paths.
- Posts pages use the English Open Graph image.

The site URL, name, and the `#person` and `#website` ids live in `frontend/src/features/site/index.ts`.

## Open Graph image

`frontend/src/app/(web)/opengraph-image.tsx` draws a 1200×630 PNG in the site's style: the name and role at the top left, `kevinpierik.dev` at the bottom, in Geist Sans on white. It reads the Geist TTF files from the `geist` package, because the image renderer can't read woff2. Next.js adds the `og:image` and `twitter:image` tags itself, so the metadata declares no images.

## Other files

- `frontend/src/app/sitemap.ts` lists the public pages, the posts index, and every published article, with posts carrying `lastModified`. Its URLs match the canonicals exactly, with no trailing slash.
- `frontend/src/app/robots.ts` allows everything except `/api/` and points to the sitemap.
- `frontend/src/app/manifest.ts` serves `/manifest.webmanifest` with the name and icons.

## Off-site signals

Ranking for a name depends mostly on what links to the site. Keep the profiles in `sameAs` linking back to https://www.kevinpierik.dev, and add new profiles to `sameAs` and `llms.txt`.
