import type { Metadata } from "next";

import { Desktop } from "@/components/desktop/desktop";
import { PrivacyContent } from "@/components/desktop/privacy-content";
import { LocalTime } from "@/components/sections/local-time";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Portfolio",
  alternates: { canonical: "/portfolio" },
};

export default function Portfolio() {
  return (
    <main id="main" className="h-svh bg-background px-1.5 pb-1.5">
      <Desktop
        mode="portfolio"
        name={siteConfig.name}
        status={<LocalTime />}
        content={{
          privacy: <PrivacyContent />,
        }}
      />
    </main>
  );
}
