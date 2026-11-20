import type { Metadata } from "next";

import { JsonLd } from "@/components/json-ld";
import { ArticleList } from "@/features/posts/article-list";
import { postsPaths, getArticles } from "@/features/posts/fetch";
import { postsMetadata, postsStructuredData } from "@/features/posts/metadata";
import { getDictionary, getLocale } from "@/features/i18n";
import { SiteFooter } from "@/features/site/site-footer";

export async function generateMetadata(): Promise<Metadata> {
  return postsMetadata(await getLocale());
}

export default async function Blog() {
  const locale = await getLocale();
  const articles = await getArticles(locale);

  return (
    <>
      <JsonLd data={postsStructuredData(locale, articles)} />
      <div className="site-container">
        <main
          aria-labelledby="posts-title"
          className="pt-[6lh] site:grid-site site:content-start"
          id="main"
        >
          <h1 className="mb-[1lh] site:col-[3/11]" id="posts-title">
            {getDictionary(locale).postsLabel}:
          </h1>
          <ArticleList articles={articles} locale={locale} />
        </main>
      </div>
      <SiteFooter alternates={postsPaths()} />
    </>
  );
}
