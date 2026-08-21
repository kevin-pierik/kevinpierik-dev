import type { Metadata, ResolvingMetadata } from "next";

import { ExtraScreen } from "@/features/desktop/extra-screen";

export async function generateMetadata(
  _props: PageProps<"/extra">,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const { openGraph } = await parent;

  return {
    title: "Extra",
    alternates: { canonical: "/extra" },
    openGraph: { ...openGraph, url: "/extra" },
  };
}

export default function Extra() {
  return <ExtraScreen />;
}
