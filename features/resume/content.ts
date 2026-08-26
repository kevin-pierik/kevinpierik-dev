import { siteConfig } from "@/features/site/config";

export type ResumeEntry = {
  title: string;
  lines: string[];
};

export type ResumeSection = {
  label: string;
  entries: ResumeEntry[];
};

export type ResumeRow = {
  key?: string;
  value: string;
  href?: string;
};

export const education: ResumeSection = {
  label: "Education",
  entries: [
    {
      title: "Deltion College",
      lines: [
        "MBO 4, Software Developer",
        "Zwolle, OV",
        "September 2023—Present",
      ],
    },
    {
      title: "Vechtdal College",
      lines: ["HAVO", "Hardenberg, OV", "August 2018"],
    },
  ],
};

export const experience: ResumeSection = {
  label: "Work Experience",
  entries: [
    {
      title: "Junior UX Developer",
      lines: ["Friday Digital Agency", "Hardenberg, OV", "May 2025—Present"],
    },
    {
      title: "Developer Intern",
      lines: [
        "Friday Digital Agency",
        "Hardenberg, OV",
        "September 2024—January 2025",
        "(5 months)",
      ],
    },
  ],
};

export const contact: ResumeRow[] = [
  { value: "Hardenberg, Overijssel" },
  { value: "The Netherlands" },
  { key: "P:", value: "+31 6 15545687", href: "tel:+31615545687" },
  { key: "E:", value: siteConfig.email, href: `mailto:${siteConfig.email}` },
];

export const social: ResumeRow[] = siteConfig.social.map((item) => ({
  value: item.label,
  href: item.href,
}));

export const role = "Frontend Developer";

export const information: string[] = [
  "Kevin Pierik is a frontend developer based in Hardenberg, the Netherlands, working at Friday Digital Agency.",
  "If you would like more information, or to discuss collaborations and other opportunities, please don’t hesitate to get in touch via email.",
];
