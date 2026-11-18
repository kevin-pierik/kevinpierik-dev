import type { ReactNode } from "react";

import { geistMono } from "@/features/fonts/mono";
import { SiteHeader } from "@/features/site/site-header";

export default function BlogLayout({ children }: { children: ReactNode }) {
  return (
    <div className={geistMono.variable}>
      <SiteHeader current="blog" />
      {children}
    </div>
  );
}
