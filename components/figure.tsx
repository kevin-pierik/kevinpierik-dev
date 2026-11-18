import Image from "next/image";
import type { ReactNode } from "react";

export const figureSizes = {
  normal: "(min-width: 1440px) 886px, (min-width: 800px) 62vw, 100vw",
  wide: "(min-width: 1440px) 1112px, (min-width: 800px) 77vw, 100vw",
};

export type FigureImage = {
  src: string;
  width: number;
  height: number;
  blurDataURL?: string;
};

type FigureProps = {
  image: FigureImage;
  alt: string;
  caption?: ReactNode;
  wide?: boolean;
  className?: string;
};

export function Figure({ image, alt, caption, wide, className }: FigureProps) {
  return (
    <figure className={className} data-wide={wide || undefined}>
      <Image
        {...image}
        alt={alt}
        className="h-auto w-full bg-subtle"
        placeholder={image.blurDataURL ? "blur" : "empty"}
        sizes={wide ? figureSizes.wide : figureSizes.normal}
      />
      {caption ? (
        <figcaption className="mt-[0.5lh] text-muted">{caption}</figcaption>
      ) : null}
    </figure>
  );
}
