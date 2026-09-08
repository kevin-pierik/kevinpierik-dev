import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";

import {
  sanityApiVersion,
  sanityClientProjectId,
  sanityDataset,
} from "./env";
import { schemaTypes } from "./sanity/schemas";

export default defineConfig({
  name: "kevinpierik",
  title: "kevinpierik.dev",
  basePath: "/studio",
  projectId: sanityClientProjectId,
  dataset: sanityDataset,
  schema: { types: schemaTypes },
  plugins: [visionTool({ defaultApiVersion: sanityApiVersion })],
});
