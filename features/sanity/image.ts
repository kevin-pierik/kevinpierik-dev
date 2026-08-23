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

type ImageRef = {
  width: number;
  height: number;
  format: string;
  animated: boolean;
};

export function parseImageRef(ref: string): ImageRef | null {
  const [, , dimensions, format] = ref.split("-");
  const [width, height] = (dimensions ?? "").split("x").map(Number);

  if (!width || !height || !format) return null;

  return { width, height, format, animated: format === "gif" };
}

const CANDIDATE_WIDTHS = [400, 640, 900, 1200, 1600, 2000];

export function imageSources(source: SanityImageSource, ref: ImageRef) {
  const base = builder.image(source).fit("max");

  if (ref.animated) {
    const width = Math.min(ref.width, 1200);
    return {
      src: base.format("webp").width(width).url(),
      srcSet: undefined,
    };
  }

  const widths = CANDIDATE_WIDTHS.filter((width) => width <= ref.width);
  if (widths.length === 0) widths.push(ref.width);

  return {
    src: base.auto("format").width(widths[widths.length - 1]).url(),
    srcSet: widths
      .map((width) => `${base.auto("format").width(width).url()} ${width}w`)
      .join(", "),
  };
}
