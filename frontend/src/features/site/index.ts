export const siteName = "Kevin Pierik";
export const siteUrl = "https://www.kevinpierik.dev";
export const contactPath = "/contact";
export const personId = `${siteUrl}/#person`;
export const websiteId = `${siteUrl}/#website`;

export function isCurrentPath(current: string | undefined, uri: string) {
  if (!current) return false;
  if (uri === "/") return current === "/";
  return current === uri || current.startsWith(`${uri}/`);
}

export function absoluteUrl(href: string) {
  return href.startsWith("/") && !href.startsWith("//")
    ? `${siteUrl}${href === "/" ? "" : href}`
    : href;
}

export const siteDescription =
  "Frontend developer in Hardenberg, Overijssel. I build fast, accessible websites with Next.js, TypeScript, and Tailwind CSS.";

export const llmsHeader = `# Kevin Pierik — Frontend Developer

> ${siteDescription}`;
