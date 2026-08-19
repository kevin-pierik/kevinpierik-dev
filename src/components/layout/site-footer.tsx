import Link from "next/link";

import { AsciiPanel } from "@/components/layout/ascii-panel";
import { Container } from "@/components/layout/container";
import { siteConfig } from "@/config/site";
import { moreIsComing, moreIsComingColumns } from "@/content/ascii-text";

const underline =
  "relative after:absolute after:-bottom-0.5 after:left-0 after:h-px after:w-full after:origin-right after:scale-x-0 after:bg-current after:transition-transform after:duration-300 hover:after:origin-left hover:after:scale-x-100";

export function SiteFooter() {
  return (
    <footer
      id="site-footer"
      className="dark relative z-10 bg-ink py-16 text-paper"
    >
      <Container className="flex flex-col gap-12 lg:flex-row lg:items-stretch lg:gap-16">
        <div className="min-w-0 flex-1">
          <AsciiPanel
            label={siteConfig.domain}
            art={moreIsComing}
            columns={moreIsComingColumns}
            caption="More is coming"
          />
        </div>

        <div className="flex shrink-0 flex-col justify-between gap-14 font-mono text-xs tracking-[0.12em] uppercase lg:items-end lg:text-right">
          <nav aria-label="Legal">
            <ul className="flex flex-col gap-2 lg:items-end">
              {siteConfig.legal.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`inline-flex min-h-12 items-center text-sm text-mist transition-colors hover:text-paper focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring ${underline}`}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex flex-col gap-1 text-mist lg:items-end">
            <p>
              &copy; {new Date().getFullYear()} {siteConfig.name}
            </p>
            <a
              href={`mailto:${siteConfig.email}`}
              className={`inline-flex min-h-12 items-center transition-colors hover:text-paper focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring ${underline}`}
            >
              {siteConfig.email}
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
}
