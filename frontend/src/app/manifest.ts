import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Kevin Pierik | Frontend Developer",
    short_name: "Kevin Pierik",
    description:
      "Frontend developer in Hardenberg, Overijssel. I build fast, accessible websites with Next.js, TypeScript, and Tailwind CSS.",
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
