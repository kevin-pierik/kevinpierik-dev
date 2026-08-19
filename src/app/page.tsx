import type { Metadata } from "next";

import { Container } from "@/components/layout/container";
import { PixelMark } from "@/components/sections/pixel-mark";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <Container className="flex h-full flex-col justify-end gap-16 pt-28 pb-16 sm:pb-20">
      <div className="flex flex-col justify-between gap-12 sm:flex-row sm:items-end">
        <h1 className="text-[clamp(2.75rem,9vw,7rem)]/[0.95] tracking-tight">
          {siteConfig.name}
        </h1>

        <PixelMark />
      </div>
    </Container>
  );
}
