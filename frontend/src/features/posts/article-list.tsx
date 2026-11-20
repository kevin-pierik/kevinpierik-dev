import { ArticleCard } from "./article-card";
import { getArticles } from "./fetch";

export async function ArticleList({ limit }: { limit?: number | null }) {
  const articles = await getArticles();
  const shown = limit ? articles.slice(0, limit) : articles;

  if (shown.length === 0) {
    return <p className="mt-[1lh] text-muted first:mt-0">No posts yet.</p>;
  }

  return (
    <ol
      aria-label="Posts"
      className="mt-[1lh] first:mt-0 site:grid-site"
      data-full
    >
      {shown.map((article) => (
        <ArticleCard article={article} key={article.slug} />
      ))}
    </ol>
  );
}
