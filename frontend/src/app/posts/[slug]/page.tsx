import type { Metadata } from "next";

import { JsonLd } from "@/components/json-ld";
import { Link } from "@/components/link";
import { postsPath, getArticle, getArticleSlugs } from "@/features/posts/fetch";
import { formatDate } from "@/features/posts/format-date";
import { postMetadata, postStructuredData } from "@/features/posts/metadata";
import { Sections } from "@/features/sections";
import { contactPath, siteName } from "@/features/site";
import { SiteFooter } from "@/features/site/site-footer";
import { SiteHeader } from "@/features/site/site-header";

type PostPageProps = {
  params: Promise<{ slug: string }>;
};

const prose = "mx-auto max-w-164.5";

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

  return (
    <>
      <JsonLd data={postStructuredData(post)} />
      <SiteHeader current={postsPath()} />
      <main
        aria-labelledby="post-title"
        className="site-container pt-30"
        id="main"
      >
        <h1
          className="mx-auto max-w-190 text-center text-[1.75rem] leading-8.5 font-medium tracking-[-0.03em] text-balance site:text-[2.5rem] site:leading-11.5"
          id="post-title"
        >
          {post.title}
        </h1>
        <p className="mt-6 text-center text-muted tabular-nums">
          {siteName}
          {" · "}
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
          {" · "}
          <Link href="/feed.xml">RSS</Link>
        </p>
        <article
          aria-labelledby="post-title"
          className="mt-20 *:mx-auto *:max-w-164.5 *:data-full:max-w-none [&>:is(figure,[data-table])]:max-w-221.25 [&>figure[data-wide]]:max-w-none"
        >
          <Sections sections={post.sections} />
        </article>
        <aside
          aria-label="Get in touch"
          className={`mt-[1lh] flex flex-col items-start gap-5 rounded-2xl bg-subtle p-7 ${prose}`}
        >
          <p className="text-[1.0625rem] leading-6.5">
            Working on something similar? I’d love to hear about it.
          </p>
          <Link className="min-h-11 px-5" href={contactPath} variant="primary">
            Get in touch
          </Link>
        </aside>
      </main>
      <SiteFooter />
    </>
  );
}
