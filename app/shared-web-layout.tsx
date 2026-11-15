import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

import "@/features/style/global.css";

import { geistSerif } from "@/features/fonts";

export const sharedMetadata: Metadata = {
  metadataBase: new URL("https://www.kevinpierik.dev"),
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

export const sharedViewport: Viewport = {
  colorScheme: "light dark",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
};

type SharedWebLayoutProps = {
  children: ReactNode;
  lang?: "en" | "nl";
};

export function SharedWebLayout({
  children,
  lang = "en",
}: SharedWebLayoutProps) {
  return (
    <html className={`bg-background ${geistSerif.variable}`} lang={lang}>
      <body className="bg-background antialiased">
        {children}
        {process.env.VERCEL_ENV ? <Analytics /> : null}
        {process.env.VERCEL_ENV ? <SpeedInsights /> : null}
      </body>
    </html>
  );
}
