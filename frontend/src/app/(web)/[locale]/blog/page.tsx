import type { Metadata } from "next";

import { JsonLd } from "@/components/json-ld";
import { ArticleList } from "@/features/blog/article-list";
import { blogPaths, getArticles } from "@/features/blog/fetch";
import { blogMetadata, blogStructuredData } from "@/features/blog/metadata";
import { getDictionary, getLocale } from "@/features/i18n";
import { SiteFooter } from "@/features/site/site-footer";

export async function generateMetadata(): Promise<Metadata> {
  return blogMetadata(await getLocale());
}

export default async function Blog() {
  const locale = await getLocale();
  const articles = await getArticles(locale);

  return (
    <>
      <JsonLd data={blogStructuredData(locale, articles)} />
      <div className="site-container">
        <main
          aria-labelledby="blog-title"
          className="pt-[6lh] site:grid-site site:content-start"
          id="main"
        >
          <h1 className="sr-only" id="blog-title">
            {getDictionary(locale).blogLabel}
          </h1>
          <ArticleList articles={articles} locale={locale} />
        </main>
      </div>
      <SiteFooter alternates={blogPaths()} />
    </>
  );
}
