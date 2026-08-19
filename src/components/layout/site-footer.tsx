import { Container } from "@/components/layout/container";
import { siteConfig } from "@/config/site";

export function SiteFooter() {
  return (
    <footer id="site-footer" className="relative z-10 bg-ink text-paper">
      <Container className="flex min-h-[70svh] flex-col justify-between gap-20 pt-24 pb-6">
        <p className="font-mono text-xs tracking-[0.12em] text-mist uppercase">
          {siteConfig.domain}
        </p>

        <p className="font-mono text-[clamp(1.5rem,7vw,5rem)]/none tracking-[0.08em] uppercase">
          {siteConfig.name}
        </p>
      </Container>

      <div className="flex flex-wrap items-center justify-between gap-x-6 bg-bios-bar font-mono text-xs tracking-[0.12em] text-bios-bar-text uppercase">
        <p className="px-4 py-4">
          &copy; {new Date().getFullYear()} {siteConfig.name}
        </p>

        {siteConfig.social.length > 0 ? (
          <nav aria-label="Social">
            <ul className="flex items-center">
              {siteConfig.social.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="inline-flex min-h-12 items-center px-4 underline-offset-2 hover:underline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-bios-bar-text"
                    rel="me noreferrer"
                    target="_blank"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        ) : (
          <p className="px-4 py-4">{siteConfig.version}</p>
        )}
      </div>
    </footer>
  );
}
