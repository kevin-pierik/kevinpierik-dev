import Link from "next/link";

import { AsciiPanel } from "@/components/layout/ascii-panel";
import { Container } from "@/components/layout/container";
import { TextFieldBackdrop } from "@/components/sections/text-field-backdrop";
import { siteConfig } from "@/config/site";
import { moreIsComing, moreIsComingColumns } from "@/content/ascii-text";

export function SiteFooter() {
  return (
    <footer
      id="site-footer"
      className="relative z-10 overflow-hidden bg-ink text-paper"
    >
      <TextFieldBackdrop />

      <Container className="relative flex min-h-[70svh] flex-col justify-between gap-16 py-16">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
          <div className="w-full lg:max-w-4xl">
            <AsciiPanel
              label={siteConfig.domain}
              art={moreIsComing}
              columns={moreIsComingColumns}
              caption="More is coming"
            />
          </div>

          <nav aria-label="Legal" className="shrink-0">
            <ul className="flex flex-col gap-1 lg:items-end">
              {siteConfig.legal.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="inline-flex min-h-12 items-center font-mono text-sm tracking-[0.12em] text-mist uppercase transition-colors hover:text-paper focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="font-mono text-xs tracking-[0.12em] text-mist uppercase">
          <p>
            &copy; {new Date().getFullYear()} {siteConfig.name}
          </p>
          <a
            href={`mailto:${siteConfig.email}`}
            className="mt-1 inline-flex min-h-12 items-center underline-offset-4 transition-colors hover:text-paper hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
          >
            {siteConfig.email}
          </a>
        </div>
      </Container>
    </footer>
  );
}
