import { siteConfig } from "@/config/site";

export type DesktopWindow = {
  id: string;
  label: string;
  title: string;
  placement: "home" | "project" | "corner";
};

export const desktopWindows: DesktopWindow[] = [
  { id: "about", label: "About", title: "About", placement: "home" },
  { id: "privacy", label: "privacy", title: "Privacy", placement: "corner" },
];

export const about = {
  intro: `${siteConfig.name} is a frontend developer and student in Hardenberg, the Netherlands.`,
  email: siteConfig.email,
};

export const privacy = {
  paragraphs: [
    "No cookies, no forms, no accounts.",
    "Vercel hosts this site and measures page speed. Standard server logs, nothing that identifies you.",
  ],
  contact: "Mail me and I keep it to reply. Nothing else.",
};
