import type { Metadata, Viewport } from "next";

import { SharedWebLayout, sharedMetadata } from "@/app/shared-web-layout";
import { BiosScreen } from "@/features/bios/bios-screen";

export const metadata: Metadata = {
  ...sharedMetadata,
  title: "Page not found",
  description: "This route does not exist on this device.",
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  colorScheme: "dark",
  themeColor: "#000000",
};

export default function GlobalNotFound() {
  return (
    <SharedWebLayout dark>
      <BiosScreen />
    </SharedWebLayout>
  );
}
