import type { MetadataRoute } from "next";

import { siteDescription } from "@/features/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Kevin Pierik | Frontend Developer",
    short_name: "Kevin Pierik",
    description: siteDescription,
    lang: "en",
    start_url: "/",
    display: "browser",
    background_color: "#ffffff",
    theme_color: "#ffffff",
    icons: [
      { src: "/favicon.ico", sizes: "any", type: "image/x-icon" },
      { src: "/icon-light.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
