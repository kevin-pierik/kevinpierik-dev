import type { Metadata } from "next";

import {
  SharedWebLayout,
  sharedMetadata,
  sharedViewport,
} from "@/app/shared-web-layout";
import { BiosScreen } from "@/features/bios/bios-screen";

export const metadata: Metadata = {
  ...sharedMetadata,
  title: "Page not found",
  description: "This route does not exist on this device.",
  robots: { index: false, follow: false },
};

export const viewport = sharedViewport;

export default function GlobalNotFound() {
  return (
    <SharedWebLayout>
      <main className="h-svh" id="main">
        <BiosScreen />
      </main>
    </SharedWebLayout>
  );
}
