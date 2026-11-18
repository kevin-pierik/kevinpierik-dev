import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";

import {
  SharedWebLayout,
  sharedMetadata,
  sharedViewport,
} from "@/app/shared-web-layout";
import { linkStyles } from "@/components/link";
import { getDictionary, getLocale, locales } from "@/features/i18n";
import { Lenis } from "@/features/lenis";
import { SanityLive } from "@/features/sanity/live";

export const metadata: Metadata = sharedMetadata;

export const viewport: Viewport = sharedViewport;

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function WebLayout({ children }: { children: ReactNode }) {
  const locale = await getLocale();

  return (
    <SharedWebLayout lang={locale}>
      <Lenis />
      <a
        className={`${linkStyles.subtle} fixed top-4 left-4 z-10 not-focus-visible:sr-only`}
        href="#main"
      >
        {getDictionary(locale).skipLabel}
      </a>
      {children}
      <SanityLive />
    </SharedWebLayout>
  );
}
