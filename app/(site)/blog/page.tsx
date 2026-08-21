import type { Metadata } from "next";

import { BlogScreen } from "@/features/blog/blog-screen";

export const metadata: Metadata = {
  title: "Blog",
  alternates: { canonical: "/blog" },
};

export default function Blog() {
  return <BlogScreen />;
}
