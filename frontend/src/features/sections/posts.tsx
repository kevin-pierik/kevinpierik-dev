import { Link } from "@/components/link";
import { ArticleList } from "@/features/posts/article-list";
import { getArticles, postsPath } from "@/features/posts/fetch";
import { headingId, headingStyles, labels } from "@/features/sanity/rich-text";
import { HeadingLink } from "@/features/sanity/rich-text/heading-link";

import type { SectionOf } from "./types";

export async function Posts({
  _key,
  title,
  limit,
  layout,
  showAllLink,
}: SectionOf<"postsSection">) {
  const articles = await getArticles();
  const grid = layout !== "list";
  const titleId = title ? headingId(title, `posts-${_key}`) : undefined;
  const list = (
    <ArticleList
      articles={limit ? articles.slice(0, limit) : articles}
      className={
        layout === "grid-3"
          ? "gap-6 sm:grid-cols-2 site:grid-cols-3"
          : grid
            ? "gap-6 sm:grid-cols-2"
            : "gap-3"
      }
      headingLevel={title ? "h3" : "h2"}
    />
  );

  if (!title && !showAllLink) {
    return (
      <div className="mt-[1lh] first:mt-0" data-full={grid || undefined}>
        {list}
      </div>
    );
  }

  return (
    <section
      aria-labelledby={titleId}
      className="mt-24 first:mt-0 site:mt-40"
      data-full={grid || undefined}
    >
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        {title && titleId ? (
          <HeadingLink
            as="h2"
            className={headingStyles.section}
            id={titleId}
            label="Copy link to heading"
            labels={labels}
          >
            {title}
          </HeadingLink>
        ) : null}
        {showAllLink ? (
          <Link
            className="min-h-11 px-5 font-medium"
            href={postsPath()}
            variant="subtle"
          >
            See all posts
            <svg
              aria-hidden="true"
              className="size-4.5"
              fill="currentColor"
              viewBox="0 -960 960 960"
            >
              <path d="M630-444H227.98q-15.29 0-25.64-10.29Q192-464.58 192-479.79t10.34-25.71q10.35-10.5 25.64-10.5H630L453.79-692.21Q443-703 443-717.5t11-25.98Q465-754 479.5-754t25.31 10.82L742.6-505.09q5.4 5.41 7.9 11.72 2.5 6.31 2.5 13.53 0 7.21-2.5 13.53Q748-460 743-455L505-217q-11 11-25 10.5t-25-11.02q-11-11.48-11-26.15 0-14.66 11-25.33l175-175Z" />
            </svg>
          </Link>
        ) : null}
      </div>
      {list}
    </section>
  );
}
