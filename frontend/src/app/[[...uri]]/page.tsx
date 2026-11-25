import type { Metadata } from "next";

import { JsonLd } from "@/components/json-ld";
import { getPage, getPageUris } from "@/features/pages/fetch";
import { homeStructuredData, pageMetadata } from "@/features/pages/metadata";
import { PageBody, pageHero } from "@/features/pages/page-body";
import { isHomeUri, pageUri, uriSegments } from "@/features/pages/uri";
import { heroTitleId } from "@/features/sections/hero";
import { SiteFooter } from "@/features/site/site-footer";
import { SiteHeader } from "@/features/site/site-header";

type PageProps = {
  params: Promise<{ uri?: string[] }>;
};

export const dynamicParams = false;

export async function generateStaticParams() {
  const uris = await getPageUris();
  return uris.map((uri) => ({ uri: uriSegments(uri) }));
}

async function resolve(params: PageProps["params"]) {
  const uri = pageUri((await params).uri);
  return { uri, isHome: isHomeUri(uri) };
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { uri, isHome } = await resolve(params);
  return pageMetadata(await getPage(uri), isHome);
}

export default async function Page({ params }: PageProps) {
  const { uri, isHome } = await resolve(params);
  const page = await getPage(uri);
  const hero = pageHero(page);

  return (
    <>
      {isHome ? <JsonLd data={homeStructuredData(page)} /> : null}
      <SiteHeader current={uri} />
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
