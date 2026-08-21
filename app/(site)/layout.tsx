import type { Metadata, Viewport } from "next";
import { draftMode } from "next/headers";
import { Geist_Mono } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { VisualEditing } from "next-sanity/visual-editing";

import "@/features/style/global.css";

import { isSanityConfigured } from "@/env";
import { DraftModeBar } from "@/features/draft-mode";
import { SanityLive } from "@/features/sanity/live";
import { siteConfig } from "@/features/site/config";
import { getSettings } from "@/features/site/resolve";
import {
  personStructuredData,
  serialiseJsonLd,
} from "@/features/site/seo/structured-data";
import { cn } from "@/features/style/utils";

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSettings();

  return {
    metadataBase: new URL(siteConfig.url),
    title: {
      default: settings.title,
      template: `%s — ${settings.name}`,
    },
    description: settings.description,
    applicationName: settings.name,
    authors: [{ name: settings.name, url: siteConfig.url }],
    creator: settings.name,
    publisher: settings.name,
    openGraph: {
      type: "website",
      siteName: settings.name,
      locale: siteConfig.locale,
      url: siteConfig.url,
      title: settings.title,
      description: settings.description,
    },
    twitter: {
      card: "summary_large_image",
      title: settings.title,
      description: settings.description,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    formatDetection: { telephone: false },
    icons: {
      icon: [
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
}

export const viewport: Viewport = {
  colorScheme: "dark",
  themeColor: "#232323",
};

export default async function SiteLayout({ children }: LayoutProps<"/">) {
  const [{ isEnabled: isDraftMode }, settings] = await Promise.all([
    draftMode(),
    getSettings(),
  ]);

  return (
    <html
      lang={siteConfig.language}
      className={cn("dark h-full", geistMono.variable)}
    >
      <body className="antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: serialiseJsonLd(personStructuredData(settings)),
          }}
        />
        {children}
        {isDraftMode && isSanityConfigured && (
          <>
            <DraftModeBar />
            <VisualEditing />
          </>
        )}
        {isSanityConfigured && <SanityLive />}
        {process.env.VERCEL_ENV ? <SpeedInsights /> : null}
      </body>
    </html>
  );
}
