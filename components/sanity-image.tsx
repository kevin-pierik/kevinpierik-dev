import { imageSources, parseImageRef } from "@/features/sanity/image";
import { cn } from "@/features/style/utils";

type SanityImageValue = {
  asset?: { _ref?: string };
  alt?: string;
};

type SanityImageProps = {
  value: SanityImageValue;
  sizes: string;
  className?: string;
  eager?: boolean;
};

export function SanityImage({
  value,
  sizes,
  className,
  eager = false,
}: SanityImageProps) {
  const reference = value.asset?._ref;
  if (!reference) return null;

  const parsed = parseImageRef(reference);
  if (!parsed) return null;

  const { src, srcSet } = imageSources(value, parsed);

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      data-slot="sanity-image"
      src={src}
      srcSet={srcSet}
      sizes={sizes}
      alt={value.alt ?? ""}
      width={parsed.width}
      height={parsed.height}
      loading={eager ? "eager" : "lazy"}
      decoding={eager ? "sync" : "async"}
      fetchPriority={eager ? "high" : undefined}
      draggable={false}
      className={cn("h-auto w-full", className)}
    />
  );
}
