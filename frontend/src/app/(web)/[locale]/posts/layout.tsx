import type { ReactNode } from "react";

import { geistMono } from "@/features/fonts/mono";
import { SiteHeader } from "@/features/site/site-header";

export default function PostsLayout({ children }: { children: ReactNode }) {
  return (
    <div className={geistMono.variable}>
      <SiteHeader current="posts" />
      {children}
    </div>
  );
}
