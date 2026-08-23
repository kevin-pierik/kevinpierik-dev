import { SanityImage } from "@/components/sanity-image";
import type { WindowMedia } from "@/features/desktop/types";

type MediaGridProps = {
  media: WindowMedia[];
};

export function MediaGrid({ media }: MediaGridProps) {
  if (media.length === 0) return null;

  return (
    <ul
      data-slot="media-grid"
      className="grid grid-cols-1 gap-1.5 sm:grid-cols-2"
    >
      {media.map((item, index) => (
        <li key={item.key} className="flex flex-col gap-1.5">
          <figure className="flex flex-col gap-1.5">
            <div className="relative aspect-square bg-paper/6 [contain-intrinsic-size:auto_24rem] [content-visibility:auto]">
              <div className="absolute inset-6 flex items-center justify-center lg:inset-10">
                <SanityImage
                  value={{ asset: item.asset, alt: item.alt }}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 24rem"
                  eager={index < 2}
                  className="max-h-full w-auto max-w-full object-contain"
                />
              </div>
            </div>
            {item.caption && (
              <figcaption className="font-mono text-[11px] text-mist">
                {item.caption}
              </figcaption>
            )}
          </figure>
        </li>
      ))}
    </ul>
  );
}
