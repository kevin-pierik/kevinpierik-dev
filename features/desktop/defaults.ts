import { siteConfig } from "@/features/site/config";
import { heading, paragraph } from "@/features/rich-text/paragraph";
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
        "I am a frontend developer and student in Hardenberg, the Netherlands.",
      ),
      paragraph(
        "about2",
        "Find me on ",
        { text: "LinkedIn", href: linkedIn },
        " or ",
        { text: "get in touch directly", href: `mailto:${siteConfig.email}` },
        ".",
      ),
    ],
    details: [],
    cover: null,
    file: null,
    seo: emptySeo,
  },
  {
    id: "about-page",
    slug: "about",
    label: "About",
    title: "About",
    placement: "standalone",
    body: [
      paragraph(
        "page1",
        "I am a frontend developer in Hardenberg, working at a digital agency while I finish my software development studies.",
      ),
      {
        _type: "linkRow",
        _key: "links",
        links: [
          {
            _key: "email",
            _type: "labelledLink",
            label: "Email",
            href: `mailto:${siteConfig.email}`,
          },
          {
            _key: "linkedin",
            _type: "labelledLink",
            label: "LinkedIn",
            href: linkedIn,
          },
          {
            _key: "resume",
            _type: "labelledLink",
            label: "Curriculum Vitae",
            href: "/files/kevin-pierik.pdf",
          },
        ],
      },
      {
        _type: "entryList",
        _key: "work",
        title: "Work",
        entries: [
          {
            _key: "friday-ux",
            _type: "entry",
            meta: "2025-",
            title: "Friday Digital Agency",
            description: "Junior UX Developer",
          },
          {
            _key: "friday-intern",
            _type: "entry",
            meta: "2024-2025",
            title: "Friday Digital Agency",
            description: "Developer Intern",
          },
        ],
      },
    ],
    details: [],
    cover: null,
    file: null,
    seo: emptySeo,
  },
  {
    id: "privacy",
    slug: "privacy",
    label: "Privacy",
    title: "Privacy",
    placement: "standalone",
    body: [
      paragraph(
        "pintro",
        "This site is a personal portfolio. It has no accounts, no forms and nothing to sign up for, so there is very little to say about your data.",
      ),

      heading("ph1", "h2", "What is stored on your device"),
      paragraph(
        "pcookies",
        "Nothing. The site sets no cookies and writes nothing to local storage. There is no cookie banner because there is nothing to consent to.",
      ),

      heading("ph2", "h2", "Who sees that you visited"),
      heading("ph2a", "h3", "Hosting"),
      paragraph(
        "phost",
        `Vercel serves this site and keeps standard server logs: the page you requested, your IP address, your browser's user agent and the time. Those logs exist to keep the site running and are not linked to anything else.`,
      ),
      heading("ph2b", "h3", "Performance measurement"),
      paragraph(
        "pspeed",
        "Vercel Speed Insights measures how fast pages load. It runs from this domain, uses no cookies and reports timings, not people. It is not analytics: it does not count visits, follow you between pages or build a profile.",
      ),
      heading("ph2c", "h3", "Images"),
      paragraph(
        "pcdn",
        "Images are served by Sanity, which holds the content of this site, so their servers see your IP address the way any server does when it sends you a file.",
      ),

      heading("ph3", "h2", "What this site does not do"),
      paragraph(
        "pnot",
        "There are no advertisements, no third-party analytics, no social media embeds, no fingerprinting and no profiling. Every script the page loads comes from this domain. Nothing you do here is sold or shared, because nothing about you is collected in the first place.",
      ),

      heading("ph5", "h2", "Questions or a request"),
      paragraph(
        "pcontact",
        "If you want to know what is in those server logs about you, or want them removed, mail me and I will look. ",
        { text: siteConfig.email, href: `mailto:${siteConfig.email}` },
        ".",
      ),
    ],
    details: [],
    cover: null,
    file: null,
    seo: emptySeo,
  },
];

export const windowsByPlacement = (placement: WindowDocument["placement"]) =>
  defaultWindows.filter((window) => window.placement === placement);
