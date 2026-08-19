import type { Metadata } from "next";

import { Container } from "@/components/layout/container";
import { SiteFooter } from "@/components/layout/site-footer";
import { LocalTime } from "@/components/sections/local-time";
import { ScrollHint } from "@/components/sections/scroll-hint";
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
        <Container className="flex h-full flex-col justify-between py-8 sm:py-10">
          <div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2">
            <h1 className="text-sm tracking-[-0.01em]">{siteConfig.name}</h1>
            <LocalTime />
          </div>

          <ScrollHint />
        </Container>
      </main>

      <SiteFooter />
    </div>
  );
}
