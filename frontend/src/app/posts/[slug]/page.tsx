import type { Metadata } from "next";

import { JsonLd } from "@/components/json-ld";
import { Link } from "@/components/link";
import { postsPath, getArticle, getArticleSlugs } from "@/features/posts/fetch";
import { formatDate } from "@/features/posts/format-date";
import { postMetadata, postStructuredData } from "@/features/posts/metadata";
import { Sections } from "@/features/sections";
import { SiteFooter } from "@/features/site/site-footer";
import { SiteHeader } from "@/features/site/site-header";

type PostPageProps = {
  params: Promise<{ slug: string }>;
};

const prose = "site:col-[4/10]";

export const dynamicParams = true;

export async function generateStaticParams() {
  return getArticleSlugs();
}

export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getArticle(slug);
  return postMetadata(post);
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const post = await getArticle(slug);
  const { previous, next } = post;

  return (
    <>
      <JsonLd data={postStructuredData(post)} />
      <SiteHeader current={postsPath()} />
      <main
        aria-labelledby="post-title"
        className="site-container pt-[6lh] site:grid-site site:content-start"
        id="main"
      >
        <p className="text-muted site:col-[3/10]">
          <Link href={postsPath()} variant="nav">
            <span aria-hidden="true">←</span>
            {" "}
            Posts
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
            {formatDate(post.publishedAt)}
          </time>
          {" · "}
          {post.readingMinutes} min read
          {post.updatedAt ? (
            <>
              {" · "}
              Updated{" "}
              <time dateTime={post.updatedAt}>
                {formatDate(post.updatedAt)}
              </time>
            </>
          ) : null}
        </p>
        <article
          aria-labelledby="post-title"
          className="mt-[3lh] site:col-span-full site:grid-site site:content-start site:*:col-[4/10] site:*:data-bleed:col-[3/-1] site:*:data-full:col-span-full site:*:data-wide:col-[2/12] site:[&>:is(figure,[data-table]):not([data-wide])]:col-[3/11]"
        >
          <Sections sections={post.sections} />
        </article>
        {previous || next ? (
          <nav aria-label="More posts" className={`mt-[6lh] ${prose}`}>
            <ul className="grid gap-[1lh] sm:grid-cols-2">
              {previous ? (
                <li>
                  <p className="text-muted">Previous</p>
                  <Link href={postsPath(previous.slug)} rel="prev">
                    {previous.title}
                  </Link>
                </li>
              ) : null}
              {next ? (
                <li className="sm:col-start-2 sm:text-right">
                  <p className="text-muted">Next</p>
                  <Link href={postsPath(next.slug)} rel="next">
                    {next.title}
                  </Link>
                </li>
              ) : null}
            </ul>
          </nav>
        ) : null}
      </main>
      <SiteFooter />
    </>
  );
}
