import Image from "next/image";

import { imageProps } from "@/features/sanity/media/image";

import type { SectionOf } from "./types";
import { Video } from "./video";

type MediaValue = Pick<
  SectionOf<"mediaSection">,
  "kind" | "image" | "video" | "videoTitle" | "autoplay"
>;

function cssAspectRatio(value: unknown) {
  if (typeof value !== "string") return undefined;
  const [width, height] = value.split(":").map(Number);
  return width && height ? `${width} / ${height}` : undefined;
}

type MediaProps = {
  media: MediaValue | null;
  sizes: string;
  className?: string;
};

export function Media({ media, sizes, className }: MediaProps) {
  if (media?.kind === "video") {
    const playbackId = media.video?.asset?.playbackId;
    if (!playbackId) return null;

    return (
      <Video
        aspectRatio={cssAspectRatio(media.video?.asset?.aspectRatio)}
        autoplay={media.autoplay ?? false}
        captions={media.video?.asset?.captions ?? []}
        className={className}
        playbackId={playbackId}
        title={media.videoTitle ?? ""}
      />
    );
  }

  if (!media?.image?.asset) return null;

  const image = imageProps(media.image);

  return (
    <Image
      {...image}
      alt={media.image.alt ?? ""}
      className={className}
      draggable={false}
      placeholder={image.blurDataURL ? "blur" : "empty"}
      sizes={sizes}
    />
  );
}
