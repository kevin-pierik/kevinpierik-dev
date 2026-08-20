import type { Metadata } from "next";

import { AboutContent } from "@/components/desktop/about-content";
import { Desktop } from "@/components/desktop/desktop";
import { PrivacyContent } from "@/components/desktop/privacy-content";
import { LocalTime } from "@/components/sections/local-time";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <main id="main" className="h-svh bg-background px-1.5 pb-1.5">
      <div className="flex h-full flex-col">
        <header className="flex h-9 shrink-0 items-center justify-between gap-4 border-b border-paper/15 px-2.5">
          <div className="flex items-center gap-2">
            <span aria-hidden className="size-1.5 rounded-full bg-orange" />
            <h1 className="font-mono text-xs tracking-[0.08em]">
              {siteConfig.name}
            </h1>
          </div>

          <LocalTime />
        </header>

        <Desktop
          content={{
            about: <AboutContent />,
            privacy: <PrivacyContent />,
          }}
        />
      </div>
    </main>
  );
}
