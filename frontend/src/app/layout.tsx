import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import localFont from "next/font/local";

import "@/features/style/global.css";

import { linkStyles } from "@/components/link";
import { Lenis } from "@/features/lenis";
import { getArticles } from "@/features/posts/fetch";
import { siteName, siteUrl } from "@/features/site";
import { email, socialLinks } from "@/features/site/social-links";
import { WebMcp } from "@/features/site/webmcp";

const geistSans = localFont({
  src: "../features/style/fonts/geist-latin.woff2",
  variable: "--font-geist-sans",
  weight: "400 700",
});

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

const webMcpTrialToken = process.env.NEXT_PUBLIC_WEBMCP_TRIAL_TOKEN;

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  const posts = await getArticles();

  return (
    <html className={`bg-background ${geistSans.variable}`} lang="en">
      <head>
        <link
          href="/feed.xml"
          rel="alternate"
          title={`${siteName} — Posts`}
          type="application/rss+xml"
        />
        {webMcpTrialToken ? (
          <meta content={webMcpTrialToken} httpEquiv="origin-trial" />
        ) : null}
      </head>
      <body className="bg-background antialiased">
        <Lenis />
        <WebMcp
          contact={{
            email,
            links: socialLinks.map(({ label, href }) => ({ label, href })),
          }}
          posts={posts}
        />
        <a
          className={`${linkStyles.subtle} fixed top-4 left-4 z-10 not-focus-visible:sr-only`}
          href="#main"
        >
          Skip to content
        </a>
        {children}
        {process.env.VERCEL_ENV ? <Analytics /> : null}
        {process.env.VERCEL_ENV ? <SpeedInsights /> : null}
      </body>
    </html>
  );
}
