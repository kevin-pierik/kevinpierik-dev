import type { ReactNode } from "react";

import { Container } from "@/components/layout/container";
import { SiteFooter } from "@/components/layout/site-footer";

type ContentPageProps = {
  title: string;
  updated: string;
  children: ReactNode;
};

export function ContentPage({ title, updated, children }: ContentPageProps) {
  return (
    <>
      <main id="main" className="bg-background pt-24 pb-28">
        <Container>
          <p className="font-mono text-xs tracking-[0.12em] text-foreground/60 uppercase">
            {updated}
          </p>

          <h1 className="mt-8 max-w-[24ch] text-[clamp(2rem,5vw,3.5rem)]/[1.05]">
            {title}
          </h1>

          <div className="mt-12 max-w-prose space-y-6 text-base/relaxed text-foreground/75 [&_a]:underline [&_a]:underline-offset-4 [&_h2]:mt-12 [&_h2]:text-xl [&_h2]:text-foreground">
            {children}
          </div>
        </Container>
      </main>

      <SiteFooter />
    </>
  );
}
