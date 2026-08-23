import type { Metadata, ResolvingMetadata } from "next";
import { notFound } from "next/navigation";

import { WorksScreen } from "@/features/desktop/works-screen";
import { readingFont } from "@/features/desktop/reading-font";
import { getProject, getProjectSlugs } from "@/features/desktop/resolve";
import { JsonLd } from "@/components/json-ld";
import {
  breadcrumbStructuredData,
} from "@/features/site/seo/structured-data";
import { robotsFor } from "@/features/site/seo/utils";

export async function generateStaticParams() {
  return getProjectSlugs();
}

export async function generateMetadata(
  { params }: PageProps<"/works/[slug]">,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) return {};

  return {
    title: project.seo.metaTitle ?? project.title,
    description: project.seo.metaDescription ?? undefined,
    alternates: { canonical: `/works/${slug}` },
    openGraph: { ...(await parent).openGraph, url: `/works/${slug}` },
    robots: robotsFor(project.seo),
  };
}

export default async function ProjectPage({
  params,
}: PageProps<"/works/[slug]">) {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) notFound();

  return (
    <>
      <JsonLd data={breadcrumbStructuredData([
              { name: "Home", href: "/" },
              { name: "Works", href: "/works" },
              { name: project.title, href: `/works/${slug}` },
            ])} />
      <WorksScreen slug={slug} fontClassName={readingFont.variable} />
    </>
  );
}
