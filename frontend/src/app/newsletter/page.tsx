import type { Metadata } from "next";

import { getPage, newsletterPath } from "@/features/pages/fetch";
import { pageMetadata } from "@/features/pages/metadata";
import { PageBody } from "@/features/pages/page-body";
import { NewsletterForm } from "@/features/posts/newsletter-form";
import { SiteFooter } from "@/features/site/site-footer";
import { SiteHeader } from "@/features/site/site-header";

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata(await getPage(newsletterPath), false);
}

export default async function Newsletter() {
  const page = await getPage(newsletterPath);

  return (
    <>
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
        <div className="mt-[2lh] site:col-[3/11]">
          <NewsletterForm />
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
