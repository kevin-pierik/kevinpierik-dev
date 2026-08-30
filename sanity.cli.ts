import { defineCliConfig } from "sanity/cli";

import { sanityClientProjectId, sanityDataset } from "./env";

export default defineCliConfig({
  api: { projectId: sanityClientProjectId, dataset: sanityDataset },
  studioHost: "kevinpierik",
});
