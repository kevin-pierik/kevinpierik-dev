import type { APIRoute } from "astro";

export const prerender = true;

export const GET: APIRoute = () =>
  new Response(
    "User-agent: *\nAllow: /\nDisallow: /studio/\nDisallow: /api/\n\nSitemap: https://www.kevinpierik.dev/sitemap.xml\nHost: https://www.kevinpierik.dev\n",
    { headers: { "content-type": "text/plain; charset=utf-8" } },
  );
