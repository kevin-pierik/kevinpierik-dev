import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { readingFont } from "@/features/desktop/reading-font";
import {
  getStandalonePage,
  getStandaloneSlugs,
} from "@/features/desktop/resolve";
import { StandaloneScreen } from "@/features/desktop/standalone-screen";
import { robotsFor } from "@/features/site/seo/utils";

export async function generateStaticParams() {
  return getStandaloneSlugs();
}

export async function generateMetadata({
  params,
}: PageProps<"/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const page = await getStandalonePage(slug);
  if (!page) return {};

  return {
    title: page.seo.metaTitle ?? page.title,
    description: page.seo.metaDescription ?? undefined,
    alternates: { canonical: `/${slug}` },
    robots: robotsFor(page.seo),
  };
}

export default async function StandalonePage({ params }: PageProps<"/[slug]">) {
  const { slug } = await params;
  const page = await getStandalonePage(slug);
  if (!page) notFound();

  return <StandaloneScreen page={page} fontClassName={readingFont.variable} />;
}
