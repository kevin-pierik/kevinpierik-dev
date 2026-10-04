export type CvEntry = {
  title: string;
  lines: string[];
};

export type SocialProfile = {
  label: string;
  href: string;
};

export const profile = {
  name: "Kevin Pierik",
  role: "Frontend Developer",
  url: "https://www.kevinpierik.dev",
  description:
    "Frontend developer focused on clear, useful interfaces in Hardenberg, the Netherlands.",
  about: [
    "Kevin Pierik is a frontend developer based in Hardenberg, the Netherlands, working at Friday Digital Agency.",
    "If you would like more information, or to discuss collaborations and other opportunities, please don’t hesitate to get in touch via email.",
  ],
  contact: {
    email: "kevinpierik@icloud.com",
    phone: "+31 6 15545687",
    address: {
      locality: "Hardenberg",
      region: "Overijssel",
      country: "The Netherlands",
    },
  },
  social: [
    { label: "LinkedIn", href: "https://nl.linkedin.com/in/kevin-pierik" },
    { label: "Instagram", href: "https://www.instagram.com/kevinpierikk" },
  ] satisfies SocialProfile[],
  education: [
    {
      title: "Deltion College",
      lines: ["MBO 4, Software Developer", "Zwolle, OV", "September 2023—Present"],
    },
    {
      title: "Vechtdal College",
      lines: ["HAVO", "Hardenberg, OV", "August 2018"],
    },
  ] satisfies CvEntry[],
  skills: [
    {
      title: "Working knowledge in:",
      lines: ["Next.js, TypeScript,", "Tailwind, Vercel"],
    },
  ] satisfies CvEntry[],
  experience: [
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
  ] satisfies CvEntry[],
};

export const pageTitle = `${profile.role} | ${profile.name}`;

export const phoneHref = `tel:${profile.contact.phone.replaceAll(" ", "")}`;
export const emailHref = `mailto:${profile.contact.email}`;
