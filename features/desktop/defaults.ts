import { siteConfig } from "@/features/site/config";
import { paragraph } from "@/features/rich-text/paragraph";
import { emptySeo } from "@/features/site/seo/utils";
import type { WindowDocument } from "@/features/desktop/types";

const linkedIn = siteConfig.social[0]?.href ?? "";

export const defaultWindows: WindowDocument[] = [
  {
    id: "about",
    label: "About",
    title: "About",
    placement: "home",
    body: [
      paragraph(
        "about1",
        `${siteConfig.name} is a frontend developer and student in Hardenberg, the Netherlands.`,
      ),
      paragraph(
        "about2",
        "Find him on ",
        { text: "LinkedIn", href: linkedIn },
        " or ",
        { text: "get in touch directly", href: `mailto:${siteConfig.email}` },
        ".",
      ),
    ],
    details: [],
    file: null,
    seo: emptySeo,
  },
  {
    id: "curriculum-vitae",
    label: "Curriculum Vitae",
    title: "Curriculum Vitae",
    placement: "project",
    body: [],
    details: [
      { label: "AUTHOR", value: siteConfig.name },
      { label: "UPDATED", value: "20 August 2026" },
      { label: "PAGES", value: "1" },
      {
        label: "ABOUT",
        value: "Experience, education, and skills in frontend development.",
      },
    ],
    file: { url: "/files/kevin-pierik.pdf", name: "kevin-pierik.pdf" },
    seo: emptySeo,
  },
  {
    id: "privacy",
    label: "privacy",
    title: "Privacy",
    placement: "corner",
    body: [
      paragraph("privacy1", "No cookies, no forms, no accounts."),
      paragraph(
        "privacy2",
        "Vercel hosts this site and measures page speed. Standard server logs, nothing that identifies you.",
      ),
      paragraph(
        "privacy3",
        "Mail me and I keep it to reply. Nothing else. ",
        { text: siteConfig.email, href: `mailto:${siteConfig.email}` },
      ),
    ],
    details: [],
    file: null,
    seo: emptySeo,
  },
];

export const windowsByPlacement = (placement: WindowDocument["placement"]) =>
  defaultWindows.filter((window) => window.placement === placement);
