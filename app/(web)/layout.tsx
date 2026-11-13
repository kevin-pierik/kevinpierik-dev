import type { Metadata, Viewport } from "next";

import {
  SharedWebLayout,
  sharedMetadata,
  sharedViewport,
} from "@/app/shared-web-layout";
import { Lenis } from "@/features/lenis";

export const metadata: Metadata = sharedMetadata;

export const viewport: Viewport = sharedViewport;

export default function WebLayout({ children }: LayoutProps<"/">) {
  return (
    <SharedWebLayout>
      <Lenis />
      {children}
    </SharedWebLayout>
  );
}
