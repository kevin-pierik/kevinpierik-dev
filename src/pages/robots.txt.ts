import type { APIRoute } from "astro";

import { siteConfig } from "../features/site/config";

export const prerender = true;

export const GET: APIRoute = () =>
  new Response(
    `User-agent: *\nAllow: /\nDisallow: /studio/\nDisallow: /api/\n\nSitemap: ${siteConfig.url}/sitemap.xml\nHost: ${siteConfig.url}\n`,
    { headers: { "content-type": "text/plain; charset=utf-8" } },
  );
