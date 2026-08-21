import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";

import "@/features/style/global.css";

import { BiosScreen } from "@/features/bios/bios-screen";
import { siteConfig } from "@/features/site/config";
import { cn } from "@/features/style/utils";

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Page not found",
  description: "This route does not exist on this device.",
};

export default function GlobalNotFound() {
  return (
    <html
      lang={siteConfig.language}
      className={cn("h-full", geistMono.variable)}
    >
      <body className="h-full antialiased">
        <BiosScreen />
      </body>
    </html>
  );
}
