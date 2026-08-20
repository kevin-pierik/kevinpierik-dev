import { siteConfig } from "@/config/site";

export type DesktopWindow = {
  id: string;
  label: string;
  title: string;
  placement: "files" | "corner";
};

export const desktopWindows: DesktopWindow[] = [
  { id: "about", label: "About", title: "About", placement: "files" },
  { id: "privacy", label: "privacy", title: "Privacy", placement: "corner" },
];

export const about = {
  intro: `${siteConfig.name} is a frontend developer and student in Hardenberg, the Netherlands.`,
  email: siteConfig.email,
};

export const privacy = {
  paragraphs: [
    "This site sets no cookies and has no forms, comments or accounts.",
    "Page performance is measured with Vercel Speed Insights: it records how fast pages render and sends those numbers to Vercel. It sets no cookies, and I cannot identify individual visitors from it.",
    "The site is hosted by Vercel, which processes technical request data — IP address, user agent, requested URL — to serve the pages and protect its platform.",
  ],
  contact: "If you email me, I keep that message to reply to you. Nothing else.",
};
