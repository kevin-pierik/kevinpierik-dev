import { Link } from "@/components/link";
import type { Locale } from "@/features/i18n";
import type { ARTICLES_QUERY_RESULT } from "@/features/sanity/sanity.types";

import { postsPath } from "./fetch";
import { formatDate } from "./format-date";

type ArticleCardProps = {
  article: ARTICLES_QUERY_RESULT[number];
  locale: Locale;
};

export function ArticleCard({ article, locale }: ArticleCardProps) {
  return (
    <li className="grid site:col-span-full site:grid-site [&+&]:mt-[1lh]">
      <p className="text-muted tabular-nums site:col-[3/5]">
        <time dateTime={article.publishedAt}>
          {formatDate(locale, article.publishedAt)}
        </time>
      </p>
      <div className="site:col-[5/11]">
        <h2>
          <Link href={postsPath(locale, article.slug)} variant="nav">
            {article.title}
          </Link>
        </h2>
        <p className="max-w-[65ch] text-muted">{article.description}</p>
      </div>
    </li>
  );
}
