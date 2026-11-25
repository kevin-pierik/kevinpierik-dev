import type { Metadata } from "next";

import { JsonLd } from "@/components/json-ld";
import { getPage } from "@/features/pages/fetch";
import { pageMetadata } from "@/features/pages/metadata";
import { PageBody, pageHero } from "@/features/pages/page-body";
import { heroTitleId } from "@/features/sections/hero";
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

  const hero = pageHero(page);

  return (
    <>
      <JsonLd data={postsStructuredData(page, articles)} />
      <SiteHeader current={page.uri} />
      <main
        aria-labelledby={hero ? heroTitleId : "main-title"}
        className={`site-container ${hero ? "" : "pt-[6lh]"}`}
        id="main"
      >
        {hero ? null : (
          <h1 className="sr-only" id="main-title">
            {page.title}
          </h1>
        )}
        <PageBody page={page} />
      </main>
      <SiteFooter />
    </>
  );
}
