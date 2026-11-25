import { Link } from "@/components/link";
import { ArticleList } from "@/features/posts/article-list";
import { getArticles, postsPath } from "@/features/posts/fetch";
import { headingStyles, labels } from "@/features/sanity/rich-text";
import { HeadingLink } from "@/features/sanity/rich-text/heading-link";
import { slugify } from "@studio/slug";

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
  const titleId = title ? slugify(title) || `posts-${_key}` : undefined;
  const list = (
    <ArticleList
      articles={limit ? articles.slice(0, limit) : articles}
      className={grid ? "gap-6 sm:grid-cols-2" : "gap-3"}
    />
  );

  if (!title && !showAllLink) {
    return <div className="mt-[1lh] first:mt-0">{list}</div>;
  }

  return (
    <section
      aria-labelledby={titleId}
      className="mt-24 first:mt-0 site:mt-40"
      data-full={grid || undefined}
    >
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        {title && titleId ? (
          <h2 className={headingStyles.section} id={titleId}>
            <HeadingLink
              id={titleId}
              label="Copy link to heading"
              labels={labels}
            >
              {title}
            </HeadingLink>
          </h2>
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
              className="size-4"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              viewBox="0 0 16 16"
            >
              <path d="M3 8h10M9 4l4 4-4 4" />
            </svg>
          </Link>
        ) : null}
      </div>
      {list}
    </section>
  );
}
