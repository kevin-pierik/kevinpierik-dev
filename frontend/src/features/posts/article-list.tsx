import { getDictionary, type Locale } from "@/features/i18n";
import type { ARTICLES_QUERY_RESULT } from "@/features/sanity/sanity.types";

import { ArticleCard } from "./article-card";

type ArticleListProps = {
  articles: ARTICLES_QUERY_RESULT;
  locale: Locale;
};

export function ArticleList({ articles, locale }: ArticleListProps) {
  const { postsLabel, noPosts } = getDictionary(locale);

  if (articles.length === 0) {
    return <p className="text-muted site:col-[3/11]">{noPosts}</p>;
  }

  return (
    <ol aria-label={postsLabel} className="site:col-span-full site:grid-site">
      {articles.map((article) => (
        <ArticleCard article={article} key={article.slug} locale={locale} />
      ))}
    </ol>
  );
}
