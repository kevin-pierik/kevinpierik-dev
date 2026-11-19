import type { Metadata } from "next";

import { JsonLd } from "@/components/json-ld";
import { getLocale } from "@/features/i18n";
import { getPage, getPageUris } from "@/features/pages/fetch";
import { homeStructuredData, pageMetadata } from "@/features/pages/metadata";
import { isHomeUri, pageUri, uriSegments } from "@/features/pages/uri";
import { Sections } from "@/features/sections";
import { SiteFooter } from "@/features/site/site-footer";
import { SiteHeader } from "@/features/site/site-header";

type PageProps = {
  params: Promise<{ uri?: string[] }>;
};

export const dynamicParams = true;

export async function generateStaticParams() {
  const locale = await getLocale();
  const uris = await getPageUris(locale);
  return uris.map((uri) => ({ uri: uriSegments(locale, uri) }));
}

async function resolve(params: PageProps["params"]) {
  const locale = await getLocale();
  const uri = pageUri(locale, (await params).uri);
  return { locale, uri, isHome: isHomeUri(locale, uri) };
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale, uri, isHome } = await resolve(params);
  return pageMetadata(locale, await getPage(locale, uri), isHome);
}

export default async function Page({ params }: PageProps) {
  const { locale, uri, isHome } = await resolve(params);
  const page = await getPage(locale, uri);

  return (
    <>
      {isHome ? <JsonLd data={homeStructuredData(locale)} /> : null}
      <SiteHeader current={isHome ? "index" : undefined} />
      <div className="site-container">
        <main
          aria-labelledby={isHome ? "page-title" : "main-title"}
          className="pt-[6lh] site:grid-site site:content-start"
          id="main"
        >
          {isHome ? null : (
            <h1 className="site:col-[3/11]" id="main-title">
              {page.title}
            </h1>
          )}
          <Sections sections={page.sections} />
        </main>
      </div>
      <SiteFooter alternates={page.alternates} />
    </>
  );
}
