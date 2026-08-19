import type { Metadata } from "next";
import { Geist_Mono, Geist_Pixel } from "next/font/google";

import "./globals.css";

import { BiosScreen } from "@/components/sections/bios-screen";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

const geistPixel = Geist_Pixel({
  subsets: ["latin"],
  axes: ["ELSH"],
  variable: "--font-pixel",
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  title: "Page not found",
  description: "This route does not exist on this device.",
};

export default function GlobalNotFound() {
  return (
    <html
      lang={siteConfig.language}
      className={cn("h-full", geistMono.variable, geistPixel.variable)}
    >
      <body className="h-full antialiased">
        <BiosScreen />
      </body>
    </html>
  );
}
