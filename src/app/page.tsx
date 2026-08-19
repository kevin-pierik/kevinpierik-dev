import type { Metadata } from "next";

import { Container } from "@/components/layout/container";
import { SiteFooter } from "@/components/layout/site-footer";
import { CanvasBackdrop } from "@/components/sections/canvas-backdrop";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <div className="relative">
      <main
        id="main"
        className="sticky top-0 h-svh overflow-hidden bg-background"
      >
        <CanvasBackdrop />

        <Container className="relative flex h-full flex-col justify-end pb-16 sm:pb-20">
          <h1 className="text-[clamp(2.75rem,9vw,7rem)]/[0.95] tracking-tight">
            {siteConfig.name}
          </h1>
        </Container>
      </main>

      <SiteFooter />
    </div>
  );
}
