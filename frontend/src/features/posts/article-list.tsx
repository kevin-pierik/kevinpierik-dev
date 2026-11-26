import { Link } from "@/components/link";

import { getArticles, postsPath } from "./fetch";
import { formatDate } from "./format-date";

type ArticleListProps = {
  articles: Awaited<ReturnType<typeof getArticles>>;
  className: string;
  headingLevel?: "h2" | "h3";
};

export function ArticleList({
  articles,
  className,
  headingLevel: Heading = "h3",
}: ArticleListProps) {
  if (articles.length === 0) {
    return (
      <p className={className}>
        <span className="inline-block rounded-full bg-subtle px-3 py-1 text-sm">
          Coming soon
        </span>
      </p>
    );
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
          <Heading className="mt-[0.5lh] font-medium">{article.title}</Heading>
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
              className="size-4.5 transition-transform group-hover:translate-x-0.5"
              fill="currentColor"
              viewBox="0 -960 960 960"
            >
              <path d="M630-444H227.98q-15.29 0-25.64-10.29Q192-464.58 192-479.79t10.34-25.71q10.35-10.5 25.64-10.5H630L453.79-692.21Q443-703 443-717.5t11-25.98Q465-754 479.5-754t25.31 10.82L742.6-505.09q5.4 5.41 7.9 11.72 2.5 6.31 2.5 13.53 0 7.21-2.5 13.53Q748-460 743-455L505-217q-11 11-25 10.5t-25-11.02q-11-11.48-11-26.15 0-14.66 11-25.33l175-175Z" />
            </svg>
            Read more<span className="sr-only">: {article.title}</span>
          </Link>
        </li>
      ))}
    </ol>
  );
}
