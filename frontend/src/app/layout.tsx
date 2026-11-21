import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { GeistSans as geistSans } from "geist/font/sans";

import "@/features/style/global.css";

import { linkStyles } from "@/components/link";
import { Lenis } from "@/features/lenis";
import { SanityLive } from "@/features/sanity/live";
import { siteUrl } from "@/features/site";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  formatDetection: { telephone: false },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      {
        url: "/icon-light.png",
        type: "image/png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark.png",
        type: "image/png",
        media: "(prefers-color-scheme: dark)",
      },
    ],
  },
};

export const viewport: Viewport = {
  colorScheme: "light dark",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html className={`bg-background ${geistSans.variable}`} lang="en">
      <body className="bg-background antialiased">
        <Lenis />
        <a
          className={`${linkStyles.subtle} fixed top-4 left-4 z-10 not-focus-visible:sr-only`}
          href="#main"
        >
          Skip to content
        </a>
        {children}
        <SanityLive />
        {process.env.VERCEL_ENV ? <Analytics /> : null}
        {process.env.VERCEL_ENV ? <SpeedInsights /> : null}
      </body>
    </html>
  );
}
