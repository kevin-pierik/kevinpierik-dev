import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

import "@/features/style/global.css";

import { helvetica } from "@/features/fonts";

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
  colorScheme: "dark",
  themeColor: "#000000",
};

type SharedWebLayoutProps = {
  children: ReactNode;
};

export function SharedWebLayout({ children }: SharedWebLayoutProps) {
  return (
    <html className={`dark h-full bg-black ${helvetica.variable}`} lang="en">
      <body className="bg-black antialiased">
        {children}
        {process.env.VERCEL_ENV ? <Analytics /> : null}
        {process.env.VERCEL_ENV ? <SpeedInsights /> : null}
      </body>
    </html>
  );
}
