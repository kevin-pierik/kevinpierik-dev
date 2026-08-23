import type { Metadata, ResolvingMetadata } from "next";

import { WordsScreen } from "@/features/words/words-screen";

export async function generateMetadata(
  _props: PageProps<"/words">,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const { openGraph } = await parent;

  return {
    title: "Words",
    alternates: { canonical: "/words" },
    openGraph: { ...openGraph, url: "/words" },
  };
}

export default function Words() {
  return <WordsScreen />;
}
