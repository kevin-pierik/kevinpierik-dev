import { createClient } from "next-sanity";

import { apiVersion, dataset, projectId } from "./env";

const build = (process.env.VERCEL_DEPLOYMENT_ID ?? String(Date.now()))
  .toLowerCase()
  .replace(/[^a-z0-9]+/g, "-");

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
  perspective: "published",
  requestTagPrefix: `build.${build}`,
});
