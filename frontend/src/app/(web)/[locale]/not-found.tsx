import type { Metadata } from "next";

import { Link } from "@/components/link";
import { getDictionary, getLocale } from "@/features/i18n";
import { SiteFooter } from "@/features/site/site-footer";
import { SiteHeader } from "@/features/site/site-header";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default async function NotFound() {
  const { notFoundTitle, notFoundText, notFoundLink, path } = getDictionary(
    await getLocale(),
  );

  return (
    <>
      <SiteHeader />
      <div className="site-container">
        <main
          aria-labelledby="main-title"
          className="pt-[6lh] site:grid-site site:content-start"
          id="main"
        >
          <h1 className="site:col-[3/11]" id="main-title">
            {notFoundTitle}
          </h1>
          <p className="text-muted site:col-[3/11]">
            {notFoundText} <Link href={path}>{notFoundLink}</Link>
          </p>
        </main>
      </div>
      <SiteFooter />
    </>
  );
}
