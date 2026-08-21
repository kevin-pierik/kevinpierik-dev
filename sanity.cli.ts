import { defineCliConfig } from "sanity/cli";

import { sanityClientProjectId, sanityDataset } from "./env";

export default defineCliConfig({
  api: { projectId: sanityClientProjectId, dataset: sanityDataset },
  studioHost: "kevinpierik",
  typegen: {
    path: "./{app,components,features,sanity}/**/*.{ts,tsx}",
    schema: "./sanity/schema.json",
    generates: "./features/sanity/types.gen.ts",
    overloadClientMethods: true,
  },
});
