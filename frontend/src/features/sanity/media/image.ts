import {
  createImageUrlBuilder,
  type SanityImageSource,
} from "@sanity/image-url";

import { client } from "@/features/sanity/client";

const builder = createImageUrlBuilder(client);

type SanityImage = SanityImageSource & {
  crop?: {
    top?: number;
    bottom?: number;
    left?: number;
    right?: number;
  } | null;
  asset: {
    metadata: {
      lqip: string | null;
      dimensions: { width: number | null; height: number | null } | null;
    } | null;
  } | null;
};

export function imageProps(image: SanityImage) {
  const dimensions = image.asset?.metadata?.dimensions;
  const width = dimensions?.width ?? 1600;
  const height = dimensions?.height ?? 1000;
  const { top = 0, bottom = 0, left = 0, right = 0 } = image.crop ?? {};

  return {
    src: builder.image(image).url(),
    width: Math.round(width * (1 - left - right)),
    height: Math.round(height * (1 - top - bottom)),
    blurDataURL: image.asset?.metadata?.lqip ?? undefined,
  };
}
