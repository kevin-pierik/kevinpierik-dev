const allowedProtocols = new Set(["http:", "https:", "mailto:", "tel:"]);

export function safeHref(href: string | null | undefined) {
  if (!href) return undefined;
  if (href.startsWith("/") && !href.startsWith("//")) return href;
  try {
    return allowedProtocols.has(new URL(href).protocol) ? href : undefined;
  } catch {
    return undefined;
  }
}
