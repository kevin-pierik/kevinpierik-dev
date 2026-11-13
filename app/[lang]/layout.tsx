import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";

import {
  SharedWebLayout,
  sharedMetadata,
  sharedViewport,
} from "@/app/shared-web-layout";
import { getLocale, prefixedLocales } from "@/features/i18n";
import { Lenis } from "@/features/lenis";
import { SiteFooter } from "@/features/site/site-footer";
import { SiteHeader } from "@/features/site/site-header";

export const metadata: Metadata = sharedMetadata;

export const viewport: Viewport = sharedViewport;

export const dynamicParams = false;

export function generateStaticParams() {
  return prefixedLocales.map((lang) => ({ lang }));
}

export default async function WebLayout({ children }: { children: ReactNode }) {
  return (
    <SharedWebLayout lang={await getLocale()}>
      <Lenis />
      <SiteHeader />
      <div className="mx-auto w-full max-w-[1440px] px-[max(1.5rem,3.5%)]">
        <div className="min-[800px]:px-[16.9583%]">{children}</div>
      </div>
      <SiteFooter />
    </SharedWebLayout>
  );
}
