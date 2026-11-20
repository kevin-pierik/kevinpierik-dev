import type { ARTICLES_QUERY_RESULT } from "@/features/sanity/sanity.types";

import { ArticleCard } from "./article-card";

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
        <ArticleCard article={article} key={article.slug} />
      ))}
    </ol>
  );
}
