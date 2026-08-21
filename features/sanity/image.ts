import {
  createImageUrlBuilder,
  type SanityImageSource,
} from "@sanity/image-url";

import { sanityClientProjectId, sanityDataset } from "@/env";

const builder = createImageUrlBuilder({
  projectId: sanityClientProjectId,
  dataset: sanityDataset,
});

export function urlForImage(source: SanityImageSource) {
  return builder.image(source).auto("format").fit("max");
}
