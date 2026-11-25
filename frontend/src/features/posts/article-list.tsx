import { Link } from "@/components/link";
import type { ARTICLES_QUERY_RESULT } from "@/features/sanity/sanity.types";

import { postsPath } from "./fetch";

export function ArticleList({ articles }: { articles: ARTICLES_QUERY_RESULT }) {
  if (articles.length === 0) {
    return <p className="mt-[1lh] text-muted site:col-[3/11]">No posts yet.</p>;
  }

  return (
    <ol aria-label="Posts" className="mt-[1lh] grid gap-3 site:col-[3/11]">
      {articles.map((article) => (
        <li className="rounded-2xl bg-subtle p-6" key={article.slug}>
          <h3 className="font-medium">{article.title}</h3>
          <p className="mt-[0.5lh] max-w-[65ch] text-muted">
            {article.description}
          </p>
          <Link
            className="group mt-[1lh] inline-flex items-center gap-1.5"
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
