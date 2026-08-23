import Link from "next/link";
import type { ReactNode } from "react";

import { cn } from "@/features/style/utils";
import type { SiteLink } from "@/features/site/types";

type SiteHeaderProps = {
  name: string;
  navigation: SiteLink[];
  activeHref: string;
  status: ReactNode;
  nameAs?: "h1" | "p";
};

const linkClassName =
  "font-mono text-xs transition-colors hover:text-paper focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring";

export function SiteHeader({
  name,
  navigation,
  activeHref,
  status,
  nameAs = "p",
}: SiteHeaderProps) {
  const Name = nameAs;
  const atHome = activeHref === "/";

  return (
    <>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-9 z-40 border-b border-paper/15"
      />

      <header
        data-slot="site-header"
        className="col-span-2 col-start-1 row-start-1 flex items-center justify-between gap-4 px-2 lg:col-span-4"
      >
        <Name className="font-mono text-xs font-normal tracking-[0.08em]">
          <Link
            href="/"
            aria-current={atHome ? "page" : undefined}
            className={cn(
              "transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
              atHome ? "text-paper" : "hover:text-paper",
            )}
          >
            {name}
          </Link>
        </Name>

        <nav aria-label="Main navigation" className="flex gap-4 lg:hidden">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={item.href === activeHref ? "page" : undefined}
              className={cn(
                linkClassName,
                item.href === activeHref ? "text-paper" : "text-foreground/70",
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </header>

      <div className="col-start-5 row-start-1 hidden min-w-40 items-center justify-between gap-4 px-2 lg:col-span-8 lg:flex">
        <nav aria-label="Main navigation" className="flex items-center gap-4">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={item.href === activeHref ? "page" : undefined}
              className={cn(
                linkClassName,
                item.href === activeHref ? "text-paper" : "text-foreground/70",
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {status}
      </div>
    </>
  );
}
