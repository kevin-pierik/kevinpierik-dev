const read = (value: string | undefined) => value?.trim() ?? "";

const fallbackSiteUrl =
  process.env.NODE_ENV === "production"
    ? "https://www.kevinpierik.dev"
    : "http://localhost:4321";

export const siteUrl = (
  read(process.env.PUBLIC_SITE_URL) ||
  fallbackSiteUrl
).replace(/\/+$/, "");

export const siteDomain = siteUrl.replace(/^https?:\/\//, "");

export const sanityProjectId = read(
  process.env.PUBLIC_SANITY_PROJECT_ID,
);

export const sanityDataset =
  read(process.env.PUBLIC_SANITY_DATASET) ||
  "production";

export const sanityApiVersion =
  read(process.env.PUBLIC_SANITY_API_VERSION) ||
  "2026-08-21";

export const isSanityConfigured = sanityProjectId.length > 0;

export const sanityClientProjectId = sanityProjectId || "placeholder";
