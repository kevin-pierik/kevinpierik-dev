import type { Metadata } from "next";

import { Link } from "@/components/link";
import { SiteFooter } from "@/features/site/site-footer";
import { SiteHeader } from "@/features/site/site-header";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main
        aria-labelledby="main-title"
        className="site-container pt-[6lh] site:grid-site site:content-start"
        id="main"
      >
        <h1 className="site:col-[3/11]" id="main-title">
          Page not found
        </h1>
        <p className="text-muted site:col-[3/11]">
          The page you’re looking for can’t be found.{" "}
          <Link href="/">Return to homepage.</Link>
        </p>
      </main>
      <SiteFooter />
    </>
  );
}
