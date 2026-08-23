import type { Metadata, ResolvingMetadata } from "next";
import { notFound } from "next/navigation";

import { getPost, getPostSlugs } from "@/features/words/resolve";
import { WordsScreen } from "@/features/words/words-screen";
import { readingFont } from "@/features/desktop/reading-font";
import { JsonLd } from "@/components/json-ld";
import { getSettings } from "@/features/site/resolve";
import {
  blogPostingStructuredData,
  breadcrumbStructuredData,
} from "@/features/site/seo/structured-data";
import { robotsFor } from "@/features/site/seo/utils";

export async function generateStaticParams() {
  return getPostSlugs();
}

export async function generateMetadata(
  { params }: PageProps<"/words/[slug]">,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return {};

  return {
    title: post.seo.metaTitle ?? post.title,
    description: post.seo.metaDescription ?? post.excerpt ?? undefined,
    alternates: { canonical: `/words/${slug}` },
    robots: robotsFor(post.seo),
    openGraph: {
      ...(await parent).openGraph,
      type: "article",
      title: post.seo.metaTitle ?? post.title,
      description: post.seo.metaDescription ?? post.excerpt ?? undefined,
      publishedTime: post.publishedAt || undefined,
      url: `/words/${slug}`,
    },
  };
}

export default async function PostPage({
  params,
}: PageProps<"/words/[slug]">) {
  const { slug } = await params;
  const [post, settings] = await Promise.all([getPost(slug), getSettings()]);
  if (!post) notFound();

  return (
    <>
      <JsonLd
        data={[
          breadcrumbStructuredData([
            { name: "Home", href: "/" },
            { name: "Words", href: "/words" },
            { name: post.title, href: `/words/${slug}` },
          ]),
          blogPostingStructuredData(post, settings.name),
        ]}
      />
      <WordsScreen slug={slug} fontClassName={readingFont.variable} />
    </>
  );
}
