import type { APIRoute } from "astro";

import { siteConfig } from "../features/site/config";

export const prerender = true;

export const GET: APIRoute = () =>
  new Response(
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n  <url>\n    <loc>${siteConfig.url}/</loc>\n    <changefreq>monthly</changefreq>\n    <priority>1.0</priority>\n    <xhtml:link rel="alternate" hreflang="${siteConfig.language}" href="${siteConfig.url}/" />\n  </url>\n</urlset>\n`,
    { headers: { "content-type": "application/xml; charset=utf-8" } },
  );
