import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";

import {
  SharedWebLayout,
  sharedMetadata,
  sharedViewport,
} from "@/app/shared-web-layout";
import { linkStyles } from "@/components/link";
import { Lenis } from "@/features/lenis";
import { SanityLive } from "@/features/sanity/live";

export const metadata: Metadata = sharedMetadata;

export const viewport: Viewport = sharedViewport;

export default function WebLayout({ children }: { children: ReactNode }) {
  return (
    <SharedWebLayout>
      <Lenis />
      <a
        className={`${linkStyles.subtle} fixed top-4 left-4 z-10 not-focus-visible:sr-only`}
        href="#main"
      >
        Skip to content
      </a>
      {children}
      <SanityLive />
    </SharedWebLayout>
  );
}
