import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";

import "./globals.css";

import { BiosScreen } from "@/components/sections/bios-screen";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

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
