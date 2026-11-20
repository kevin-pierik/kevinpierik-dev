import type { Metadata, Viewport } from "next";

import {
  SharedWebLayout,
  sharedMetadata,
  sharedViewport,
} from "@/app/shared-web-layout";
import { Link } from "@/components/link";

export const metadata: Metadata = {
  ...sharedMetadata,
  title: "Page not found",
  description: "This page does not exist.",
  robots: { index: false, follow: false },
};

export const viewport: Viewport = sharedViewport;

export default function GlobalNotFound() {
  return (
    <SharedWebLayout>
      <main className="flex flex-col gap-[0.5lh] px-6 py-6 text-muted sm:pt-8">
        <h1 className="sr-only">Page not found</h1>
        <p>
          The page you’re looking for can’t be found.{" "}
          <Link href="/">Return to homepage.</Link>
        </p>
      </main>
    </SharedWebLayout>
  );
}
