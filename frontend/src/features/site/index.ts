export const siteName = "Kevin Pierik";
export const siteUrl = "https://www.kevinpierik.dev";
export const contactPath = "/contact";
export const personId = `${siteUrl}/#person`;
export const websiteId = `${siteUrl}/#website`;

export function absoluteUrl(href: string) {
  return href.startsWith("/") && !href.startsWith("//")
    ? `${siteUrl}${href === "/" ? "" : href}`
    : href;
}

export const llmsHeader = `# Kevin Pierik — Frontend Developer

> Frontend developer in Hardenberg, Overijssel. I build fast, accessible websites with Next.js, TypeScript, and Tailwind CSS.`;
