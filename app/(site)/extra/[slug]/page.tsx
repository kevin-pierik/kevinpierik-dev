import type { Metadata, ResolvingMetadata } from "next";
import { notFound } from "next/navigation";

import { ExtraScreen } from "@/features/desktop/extra-screen";
import { readingFont } from "@/features/desktop/reading-font";
import { getProject, getProjectSlugs } from "@/features/desktop/resolve";
import { robotsFor } from "@/features/site/seo/utils";

export async function generateStaticParams() {
  return getProjectSlugs();
}

export async function generateMetadata(
  { params }: PageProps<"/extra/[slug]">,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) return {};

  return {
    title: project.seo.metaTitle ?? project.title,
    description: project.seo.metaDescription ?? undefined,
    alternates: { canonical: `/extra/${slug}` },
    openGraph: { ...(await parent).openGraph, url: `/extra/${slug}` },
    robots: robotsFor(project.seo),
  };
}

export default async function ProjectPage({
  params,
}: PageProps<"/extra/[slug]">) {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) notFound();

  return <ExtraScreen slug={slug} fontClassName={readingFont.variable} />;
}
