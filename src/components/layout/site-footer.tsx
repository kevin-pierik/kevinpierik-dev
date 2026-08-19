import Link from "next/link";

import { AsciiPanel } from "@/components/layout/ascii-panel";
import { Container } from "@/components/layout/container";
import { siteConfig } from "@/config/site";
import { moreIsComing, moreIsComingColumns } from "@/content/ascii-text";

export function SiteFooter() {
  return (
    <footer id="site-footer" className="relative z-10 bg-ink text-paper">
      <Container className="flex min-h-[70svh] flex-col justify-center py-20">
        <AsciiPanel
          label={siteConfig.domain}
          art={moreIsComing}
          columns={moreIsComingColumns}
          caption="More is coming"
        />
      </Container>

      <div className="flex flex-wrap items-center justify-between gap-x-8 bg-bios-bar font-mono text-xs tracking-[0.12em] text-bios-bar-text uppercase">
        <div className="flex flex-wrap items-center">
          <p className="px-4 py-4">
            &copy; {new Date().getFullYear()} {siteConfig.name}
          </p>
          <a
            href={`mailto:${siteConfig.email}`}
            className="inline-flex min-h-12 items-center px-4 underline-offset-2 hover:underline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-bios-bar-text"
          >
            {siteConfig.email}
          </a>
        </div>

        <nav aria-label="Legal">
          <ul className="flex flex-wrap items-center">
            {siteConfig.legal.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="inline-flex min-h-12 items-center px-4 underline-offset-2 hover:underline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-bios-bar-text"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </footer>
  );
}
