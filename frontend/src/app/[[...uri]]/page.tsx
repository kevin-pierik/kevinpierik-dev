import type { Metadata } from "next";

import { JsonLd } from "@/components/json-ld";
import { getPage, getPageUris } from "@/features/pages/fetch";
import { homeStructuredData, pageMetadata } from "@/features/pages/metadata";
import { PageBody } from "@/features/pages/page-body";
import { isHomeUri, pageUri, uriSegments } from "@/features/pages/uri";
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

  return (
    <>
      {isHome ? <JsonLd data={homeStructuredData(page)} /> : null}
      <SiteHeader current={uri} />
      <main
        aria-labelledby={isHome ? "page-title" : "main-title"}
        className="site-container pt-[6lh] site:grid-site site:content-start"
        id="main"
      >
        {isHome ? null : (
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
