import type { Metadata, ResolvingMetadata } from "next";

import { WorksScreen } from "@/features/desktop/works-screen";

export async function generateMetadata(
  _props: PageProps<"/works">,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const { openGraph } = await parent;

  return {
    title: "Works",
    alternates: { canonical: "/works" },
    openGraph: { ...openGraph, url: "/works" },
  };
}

export default function Works() {
  return <WorksScreen />;
}
