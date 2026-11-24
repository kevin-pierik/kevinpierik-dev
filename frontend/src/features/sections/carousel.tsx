import { focus } from "@/components/link";
import { SanityLink } from "@/features/sanity/link";
import { headingStyles } from "@/features/sanity/rich-text";

import { BlossomCarousel } from "./blossom";
import { Media } from "./media";
import type { SectionOf } from "./types";

export function Carousel({ _key, title, items }: SectionOf<"carouselSection">) {
  if (!items?.length) return null;

  const titleId = `carousel-${_key}`;

  return (
    <>
      <h2 className={`font-medium first:mt-0 ${headingStyles.h2}`} id={titleId}>
        {title}
      </h2>
      <div className="bleed-end mt-[2lh] first:mt-0" data-bleed>
        <BlossomCarousel
          aria-labelledby={titleId}
          as="ul"
          className={`flex snap-x snap-mandatory gap-x-6 ${focus}`}
          role="list"
          tabIndex={0}
        >
          {items.map((item) => (
            <li
              className="w-[min(28rem,80vw)] shrink-0 snap-start whitespace-normal"
              data-blossom-slide
              key={item._key}
            >
              <div className="aspect-[16/10] w-full overflow-hidden bg-subtle">
                <Media
                  className="size-full object-cover"
                  media={item.media}
                  sizes="(min-width: 800px) 28rem, 80vw"
                />
              </div>
              <h3 className="mt-[1lh]">
                <SanityLink href={item.link} variant="nav">
                  {item.title}
                </SanityLink>
              </h3>
              {item.description ? (
                <p className="max-w-[48ch] text-muted">{item.description}</p>
              ) : null}
            </li>
          ))}
        </BlossomCarousel>
      </div>
    </>
  );
}
