import { Link } from "@/components/link";
import type { ARTICLES_QUERY_RESULT } from "@/features/sanity/sanity.types";

import { postsPath } from "./fetch";
import { formatDate } from "./format-date";

export function ArticleList({ articles }: { articles: ARTICLES_QUERY_RESULT }) {
  if (articles.length === 0) {
    return <p className="mt-[1lh] text-muted site:col-[3/11]">No posts yet.</p>;
  }

  return (
    <ol
      aria-label="Posts"
      className="mt-[1lh] site:col-span-full site:grid-site"
    >
      {articles.map((article) => (
        <li
          className="grid site:col-span-full site:grid-site [&+&]:mt-[1lh]"
          key={article.slug}
        >
          <p className="text-muted tabular-nums site:col-[3/5]">
            <time dateTime={article.publishedAt}>
              {formatDate(article.publishedAt)}
            </time>
          </p>
          <div className="site:col-[5/11]">
            <h3>
              <Link href={postsPath(article.slug)} variant="nav">
                {article.title}
              </Link>
            </h3>
            <p className="max-w-[65ch] text-muted">{article.description}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
