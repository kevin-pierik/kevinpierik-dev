import type { Metadata, ResolvingMetadata } from "next";
import { notFound } from "next/navigation";

import { getPost, getPostSlugs } from "@/features/blog/resolve";
import { BlogScreen } from "@/features/blog/blog-screen";
import { readingFont } from "@/features/desktop/reading-font";
import { robotsFor } from "@/features/site/seo/utils";

export async function generateStaticParams() {
  return getPostSlugs();
}

export async function generateMetadata(
  { params }: PageProps<"/blog/[slug]">,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return {};

  return {
    title: post.seo.metaTitle ?? post.title,
    description: post.seo.metaDescription ?? post.excerpt ?? undefined,
    alternates: { canonical: `/blog/${slug}` },
    robots: robotsFor(post.seo),
    openGraph: {
      ...(await parent).openGraph,
      type: "article",
      title: post.seo.metaTitle ?? post.title,
      description: post.seo.metaDescription ?? post.excerpt ?? undefined,
      publishedTime: post.publishedAt || undefined,
      url: `/blog/${slug}`,
    },
  };
}

export default async function PostPage({
  params,
}: PageProps<"/blog/[slug]">) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  return <BlogScreen slug={slug} fontClassName={readingFont.variable} />;
}
