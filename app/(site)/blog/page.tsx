import type { Metadata, ResolvingMetadata } from "next";

import { BlogScreen } from "@/features/blog/blog-screen";

export async function generateMetadata(
  _props: PageProps<"/blog">,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const { openGraph } = await parent;

  return {
    title: "Blog",
    alternates: { canonical: "/blog" },
    openGraph: { ...openGraph, url: "/blog" },
  };
}

export default function Blog() {
  return <BlogScreen />;
}
