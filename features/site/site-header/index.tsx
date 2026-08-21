"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/features/style/utils";
import type { SiteLink } from "@/features/site/types";

type SiteHeaderProps = {
  name: string;
  navigation: SiteLink[];
  activeHref: string;
  status: ReactNode;
  nameAs?: "h1" | "p";
};

export function SiteHeader({
  name,
  navigation,
  activeHref,
  status,
  nameAs = "p",
}: SiteHeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const Name = nameAs;

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
          {name}
        </Name>
        <Button
          variant="desk"
          size="none"
          onClick={() => setMenuOpen((previous) => !previous)}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          className="text-xs text-paper lg:hidden"
        >
          {menuOpen ? "Close Menu" : "Open Menu"}
        </Button>
      </header>

      <nav
        aria-label="Main navigation"
        className="col-start-5 row-start-1 hidden min-w-40 items-center justify-between gap-4 px-2 lg:col-span-8 lg:flex"
      >
        <div className="flex items-center gap-4">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={item.href === activeHref ? "page" : undefined}
              className={cn(
                "font-mono text-xs transition-colors hover:text-paper focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
                item.href === activeHref ? "text-paper" : "text-foreground/70",
              )}
            >
              {item.label}
            </Link>
          ))}
        </div>

        {status}
      </nav>

      {menuOpen && (
        <nav
          id="mobile-menu"
          aria-label="Mobile navigation"
          className="absolute inset-x-0 top-9 bottom-0 z-50 flex flex-col border-x border-b border-paper/25 bg-ink-deep/95 p-2 backdrop-blur-[1px] lg:hidden"
        >
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              aria-current={item.href === activeHref ? "page" : undefined}
              className={cn(
                "flex min-h-6 items-center font-mono text-xs transition-colors hover:text-paper focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
                item.href === activeHref ? "text-paper" : "text-mist/70",
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      )}
    </>
  );
}
