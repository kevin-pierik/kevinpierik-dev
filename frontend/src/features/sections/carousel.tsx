import { focus } from "@/components/link";
import { SanityLink } from "@/features/sanity/link";
import { headingStyles, labels } from "@/features/sanity/rich-text";
import { HeadingLink } from "@/features/sanity/rich-text/heading-link";
import { slugify } from "@studio/slug";

import { BlossomCarousel } from "./blossom";
import { Media } from "./media";
import type { SectionOf } from "./types";

export function Carousel({ _key, title, items }: SectionOf<"carouselSection">) {
  if (!items?.length) return null;

  const titleId = slugify(title ?? "") || `carousel-${_key}`;

  return (
    <section
      aria-labelledby={titleId}
      className="mt-24 first:mt-0 site:mt-40"
      data-full
    >
      <h2 className={headingStyles.section} id={titleId}>
        <HeadingLink id={titleId} label="Copy link to heading" labels={labels}>
          {title}
        </HeadingLink>
      </h2>
      <div className="bleed mt-8">
        <BlossomCarousel
          aria-label={title ?? undefined}
          as="ul"
          className={`flex snap-x snap-mandatory scroll-px-(--gutter) gap-x-6 px-(--gutter) ${focus}`}
          role="list"
          tabIndex={0}
        >
          {items.map((item) => (
            <li
              className="w-[min(28rem,80vw)] shrink-0 snap-start whitespace-normal"
              data-blossom-slide
              key={item._key}
            >
              {item.media?.image?.asset || item.media?.video?.asset ? (
                <div className="aspect-[16/10] w-full overflow-hidden rounded-xl bg-subtle">
                  <Media
                    className="size-full object-cover"
                    media={item.media}
                    sizes="(min-width: 800px) 28rem, 80vw"
                  />
                </div>
              ) : (
                <div className="grid aspect-[16/10] w-full place-items-center rounded-xl bg-[repeating-conic-gradient(var(--subtle)_0_25%,transparent_0_50%)] bg-size-[1.5rem_1.5rem]">
                  <p className="text-[1.875rem] leading-8 font-semibold tracking-[-0.05em]">
                    Coming soon
                  </p>
                </div>
              )}
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
    </section>
  );
}
