import Link from "next/link";

import { siteConfig } from "@/config/site";

export function SiteHeader() {
  return (
    <header className="fixed inset-x-3 top-3 z-50 flex items-center justify-between gap-6 bg-bios-bar font-mono text-xs tracking-[0.12em] text-bios-bar-text uppercase sm:inset-x-6 sm:top-6">
      <Link
        href="/"
        className="inline-flex min-h-12 items-center px-4 font-semibold underline-offset-2 hover:underline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-bios-bar-text"
      >
        {siteConfig.domain}
      </Link>
      <span className="px-4">{siteConfig.version}</span>
    </header>
  );
}
