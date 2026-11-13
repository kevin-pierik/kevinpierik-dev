# SEO and structured data

The homepage, in English at `/` and in Dutch at `/nl`, aims to be the first result for "Kevin Pierik" and to give search engines a complete, consistent picture of the person behind it.

## Metadata

`generateMetadata` in `app/[lang]/page.tsx` builds the metadata for both pages, from the dictionaries in `features/i18n/`:

- The title leads with the name, `Kevin Pierik | Frontend Developer`, because that is what people search for.
- A description, a canonical URL per language, and `hreflang` alternates for `en`, `nl`, and `x-default` (English).
- `author`, `creator`, `publisher`, `application-name`, `category`, and `copyright`. The copyright year comes from the build date.
- Open Graph as a `profile` (first name, last name, username) with `og.png`, and a large Twitter card. Next.js merges `openGraph` shallowly, so declare the complete object.
- `robots` allows indexing with large image previews.

`og:locale` follows the page's language (`en_US` or `nl_NL`), with the other one as `og:locale:alternate`.

## Structured data

Each page renders a JSON-LD `@graph`, typed with `schema-dts`, through `components/json-ld.tsx`:

- **WebSite**: its name, description, and both languages, with the person as publisher and copyright holder.
- **ProfilePage**: the page in its own language, with the person as its main entity.
- **Person**: name parts, contact details, address, occupation, nationality, languages, employer (Friday Digital Agency, with its URL), schools, skills, and `sameAs` links to LinkedIn, Instagram, and GitHub.

Google Search Console reports the result under Enhancements, Profile page.

## Other files

- `app/sitemap.ts` lists both pages, each with the other as a language alternate.
- `app/robots.ts` allows everything except `/api/` and points to the sitemap.
- `app/manifest.ts` serves `/manifest.webmanifest` with the name and icons.

## Off-site signals

Ranking for a name depends mostly on what links to the site. Keep the profiles in `sameAs` linking back to https://www.kevinpierik.dev, and add new profiles to `sameAs` and `llms.txt`.
