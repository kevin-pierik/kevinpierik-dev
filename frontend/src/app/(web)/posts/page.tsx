import type { Metadata } from "next";

import { JsonLd } from "@/components/json-ld";
import { getPage } from "@/features/pages/fetch";
import { pageMetadata } from "@/features/pages/metadata";
import { PageBody } from "@/features/pages/page-body";
import { ArticleList } from "@/features/posts/article-list";
import { getArticles, postsPath } from "@/features/posts/fetch";
import { postsStructuredData } from "@/features/posts/metadata";
import { SiteFooter } from "@/features/site/site-footer";
import { SiteHeader } from "@/features/site/site-header";

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata(await getPage(postsPath()), false);
}

export default async function Posts() {
  const [page, articles] = await Promise.all([
    getPage(postsPath()),
    getArticles(),
  ]);

  return (
    <>
      <JsonLd data={postsStructuredData(page, articles)} />
      <SiteHeader current={page.uri} />
      <main
        aria-labelledby="main-title"
        className="site-container pt-[6lh] site:grid-site site:content-start"
        id="main"
      >
        <h1 className="sr-only" id="main-title">
          {page.title}
        </h1>
        <PageBody page={page} />
        <ArticleList articles={articles} />
      </main>
      <SiteFooter />
    </>
  );
}
