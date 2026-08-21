import { createClient } from "next-sanity";

import {
  sanityApiVersion,
  sanityClientProjectId,
  sanityDataset,
} from "@/env";
import { studioBasePath } from "@/features/sanity/constants";

export const client = createClient({
  projectId: sanityClientProjectId,
  dataset: sanityDataset,
  apiVersion: sanityApiVersion,
  useCdn: false,
  perspective: "published",
  stega: { studioUrl: studioBasePath },
});
