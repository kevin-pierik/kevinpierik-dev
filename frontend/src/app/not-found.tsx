import type { Metadata } from "next";

import { Link } from "@/components/link";
import { SiteFooter } from "@/features/site/site-footer";
import { SiteHeader } from "@/features/site/site-header";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main
        aria-labelledby="main-title"
        className="site-container flex min-h-140 flex-col items-center justify-center gap-y-[0.5lh] text-center"
        id="main"
      >
        <h1
          className="text-3xl font-medium tracking-[-0.01em] site:text-4xl"
          id="main-title"
        >
          Page not found
        </h1>
        <p className="text-muted">
          The page you’re looking for can’t be found.
        </p>
        <p className="mt-[0.5lh]">
          <Link href="/">Homepage</Link>
          <span className="text-muted"> · </span>
          <Link href="/sitemap.xml">Sitemap</Link>
        </p>
      </main>
      <SiteFooter />
    </>
  );
}
