import { Link } from "@/components/link";

import { getArticles, postsPath } from "./fetch";
import { formatDate } from "./format-date";

type ArticleListProps = {
  articles: Awaited<ReturnType<typeof getArticles>>;
  className: string;
};

export function ArticleList({ articles, className }: ArticleListProps) {
  if (articles.length === 0) {
    return <p className={`text-muted ${className}`}>No posts yet.</p>;
  }

  return (
    <ol aria-label="Posts" className={`grid ${className}`}>
      {articles.map((article) => (
        <li
          className="flex flex-col rounded-2xl bg-subtle p-6"
          key={article.slug}
        >
          <p className="text-muted tabular-nums">
            <time dateTime={article.publishedAt}>
              {formatDate(article.publishedAt)}
            </time>
            {" · "}
            {article.readingMinutes} min read
          </p>
          <h3 className="mt-[0.5lh] font-medium">{article.title}</h3>
          <p className="mt-[0.5lh] max-w-[65ch] text-muted">
            {article.description}
          </p>
          <Link
            className="group mt-auto inline-flex items-center gap-1.5 self-start pt-[1lh] pointer-coarse:min-h-11"
            href={postsPath(article.slug)}
            variant="plain"
          >
            <svg
              aria-hidden="true"
              className="size-4 transition-transform group-hover:translate-x-0.5"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              viewBox="0 0 16 16"
            >
              <path d="M3 8h10M9 4l4 4-4 4" />
            </svg>
            Read more<span className="sr-only">: {article.title}</span>
          </Link>
        </li>
      ))}
    </ol>
  );
}
