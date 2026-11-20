import type { Metadata } from "next";
import { PortableText } from "next-sanity";

import { JsonLd } from "@/components/json-ld";
import { getPage, getPageUris } from "@/features/pages/fetch";
import { getArticles } from "@/features/posts/fetch";
import { postsStructuredData } from "@/features/posts/metadata";
import { homeStructuredData, pageMetadata } from "@/features/pages/metadata";
import { isHomeUri, pageUri, uriSegments } from "@/features/pages/uri";
import { richTextComponents } from "@/features/sanity/rich-text";
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
  const hasArticleList = page.body?.some(
    (block) => block._type === "articleList",
  );

  return (
    <>
      {isHome ? <JsonLd data={homeStructuredData(page)} /> : null}
      {hasArticleList ? (
        <JsonLd data={postsStructuredData(page, await getArticles())} />
      ) : null}
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
        <article
          aria-label={page.title}
          className="site:col-span-full site:grid-site site:content-start site:*:col-[3/11] site:*:data-full:col-span-full site:*:data-wide:col-[2/12] site:[&>:is(figure,[data-table]):not([data-wide])]:col-[3/11]"
        >
          <PortableText
            components={richTextComponents}
            value={page.body ?? []}
          />
        </article>
      </main>
      <SiteFooter />
    </>
  );
}
