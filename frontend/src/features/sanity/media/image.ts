import {
  createImageUrlBuilder,
  type SanityImageSource,
} from "@sanity/image-url";

import { client } from "../client";

const builder = createImageUrlBuilder(client);

export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

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
  const { width = 1600, height = 1000 } =
    image.asset?.metadata?.dimensions ?? {};
  const { top = 0, bottom = 0, left = 0, right = 0 } = image.crop ?? {};

  return {
    src: urlFor(image).auto("format").url(),
    width: Math.round((width ?? 1600) * (1 - left - right)),
    height: Math.round((height ?? 1000) * (1 - top - bottom)),
    blurDataURL: image.asset?.metadata?.lqip ?? undefined,
  };
}
