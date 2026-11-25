import { Buttons } from "./buttons";
import { Media } from "./media";
import type { SectionOf } from "./types";

export const heroTitleId = "page-title";

export function Hero({
  eyebrow,
  title,
  titleMuted,
  lead,
  size,
  align,
  buttons,
  image,
}: SectionOf<"heroSection">) {
  const hasImage = Boolean(image?.asset);
  const centered = align !== "left" && !hasImage;
  const small = size === "small";

  return (
    <section
      className={`${small ? "pt-18 not-last:pb-12 site:pt-30 site:not-last:pb-16" : "pt-18 not-last:pb-24 site:pt-32 site:not-last:pb-40"} ${hasImage ? "grid items-center gap-10 site:grid-cols-2 site:gap-16" : ""}`}
    >
      <div className={centered ? "text-center" : "max-w-[36rem]"}>
        {eyebrow ? (
          small ? (
            <p className="mb-5">
              <span className="inline-block rounded-full bg-subtle px-3 py-1 text-[0.875rem] leading-[1.375rem]">
                {eyebrow}
              </span>
            </p>
          ) : (
            <p className="mb-6 text-[1.0625rem] leading-[1.625rem] text-muted site:mb-8">
              {eyebrow}
            </p>
          )
        ) : null}
        <h1
          className={
            small
              ? "text-[1.75rem] leading-[2.125rem] font-medium tracking-[-0.03em] site:text-[2.5rem] site:leading-[2.875rem]"
              : "text-[2.25rem] leading-[2.5rem] font-medium tracking-[-0.025em] site:text-[4rem] site:leading-[4.25rem] site:tracking-[-0.035em]"
          }
          id={heroTitleId}
        >
          {title}
          {titleMuted ? (
            <>
              {" "}
              <span className="block text-muted">{titleMuted}</span>
            </>
          ) : null}
        </h1>
        {lead ? (
          <p
            className={`${small ? "mt-6" : "mt-7 site:mt-10"} max-w-[35rem] text-[1.125rem] leading-[1.875rem] text-muted ${centered ? "mx-auto" : ""}`}
          >
            {lead}
          </p>
        ) : null}
        <Buttons
          buttons={buttons}
          className={`${small ? "mt-8" : "mt-8 site:mt-10"} ${centered ? "justify-center" : ""}`}
        />
      </div>
      {hasImage ? (
        <Media
          className="h-auto w-full rounded-2xl bg-subtle"
          media={{
            kind: "image",
            image,
            video: null,
            videoTitle: null,
            autoplay: null,
          }}
          sizes="(min-width: 800px) 35rem, 100vw"
        />
      ) : null}
    </section>
  );
}
