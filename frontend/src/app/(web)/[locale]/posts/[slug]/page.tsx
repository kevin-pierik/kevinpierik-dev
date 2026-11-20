import type { Metadata } from "next";
import { PortableText } from "next-sanity";

import { JsonLd } from "@/components/json-ld";
import { Link } from "@/components/link";
import {
  postsPath,
  postsPaths,
  getArticle,
  getArticleSlugs,
} from "@/features/posts/fetch";
import { formatDate } from "@/features/posts/format-date";
import { postMetadata, postStructuredData } from "@/features/posts/metadata";
import { getDictionary, getLocale } from "@/features/i18n";
import { richTextComponents } from "@/features/sanity/rich-text";
import { SiteFooter } from "@/features/site/site-footer";

type PostPageProps = {
  params: Promise<{ slug: string }>;
};

const prose = "site:col-[4/10]";

export const dynamicParams = true;

export async function generateStaticParams() {
  return getArticleSlugs(await getLocale());
}

export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const locale = await getLocale();
  const post = await getArticle(locale, slug);
  return postMetadata(locale, post, post.alternates);
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const locale = await getLocale();
  const post = await getArticle(locale, slug);
  const { previous, next } = post;
  const dictionary = getDictionary(locale);
  const {
    postsLabel,
    minutesRead,
    updated,
    postNavigationLabel,
    previousPost,
    nextPost,
  } = dictionary;

  return (
    <>
      <JsonLd data={postStructuredData(locale, post)} />
      <div className="site-container">
        <main
          aria-labelledby="post-title"
          className="pt-[6lh] site:grid-site site:content-start"
          id="main"
        >
          <p className="text-muted site:col-[3/10]">
            <Link href={postsPath(locale)} variant="nav">
              <span aria-hidden="true">←</span>
              {" "}
              {postsLabel}
            </Link>
          </p>
          <h1
            className={`mt-[2lh] text-[1.75rem] leading-tight font-medium tracking-[-0.02em] ${prose}`}
            id="post-title"
          >
            {post.title}
          </h1>
          <p className={`mt-[0.5lh] text-muted tabular-nums ${prose}`}>
            <time dateTime={post.publishedAt}>
              {formatDate(locale, post.publishedAt)}
            </time>
            {" · "}
            {minutesRead.replace("{minutes}", String(post.readingMinutes))}
            {post.updatedAt ? (
              <>
                {" · "}
                {updated}{" "}
                <time dateTime={post.updatedAt}>
                  {formatDate(locale, post.updatedAt)}
                </time>
              </>
            ) : null}
          </p>
          <article
            aria-labelledby="post-title"
            className="mt-[3lh] site:col-span-full site:grid-site site:content-start site:*:col-[4/10] site:*:data-wide:col-[2/12] site:[&>:is(figure,[data-table]):not([data-wide])]:col-[3/11]"
          >
            <PortableText
              components={richTextComponents(dictionary)}
              value={post.body ?? []}
            />
          </article>
          {previous || next ? (
            <nav
              aria-label={postNavigationLabel}
              className={`mt-[6lh] ${prose}`}
            >
              <ul className="grid gap-[1lh] sm:grid-cols-2">
                {previous ? (
                  <li>
                    <p className="text-muted">{previousPost}</p>
                    <Link href={postsPath(locale, previous.slug)} rel="prev">
                      {previous.title}
                    </Link>
                  </li>
                ) : null}
                {next ? (
                  <li className="sm:col-start-2 sm:text-right">
                    <p className="text-muted">{nextPost}</p>
                    <Link href={postsPath(locale, next.slug)} rel="next">
                      {next.title}
                    </Link>
                  </li>
                ) : null}
              </ul>
            </nav>
          ) : null}
        </main>
      </div>
      <SiteFooter alternates={{ ...postsPaths(), ...post.alternates }} />
    </>
  );
}
