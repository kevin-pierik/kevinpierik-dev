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
      className={`${small ? "pt-18 not-last:pb-12 site:pt-30 site:not-last:pb-16" : "min-h-[calc(100svh-5.75rem)] py-18 site:min-h-[calc(100svh-6.25rem)] site:py-24"} ${hasImage ? "grid content-center items-center gap-10 site:grid-cols-2 site:gap-16" : small ? "" : "flex flex-col justify-center"}`}
    >
      <div className={centered ? "text-center" : "max-w-xl"}>
        {eyebrow ? (
          small ? (
            <p className="mb-5">
              <span className="inline-block rounded-full bg-subtle px-3 py-1 text-sm">
                {eyebrow}
              </span>
            </p>
          ) : (
            <p className="mb-6 text-base leading-relaxed text-muted site:mb-8">
              {eyebrow}
            </p>
          )
        ) : null}
        <h1
          className={
            small
              ? "text-3xl font-medium tracking-[-0.01em] site:text-4xl"
              : "text-4xl leading-[1.1] font-medium tracking-[-0.01em] site:text-6xl site:leading-none"
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
            className={`${small ? "mt-6" : "mt-7 site:mt-10"} max-w-140 text-lg leading-relaxed text-muted ${centered ? "mx-auto" : ""}`}
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
          sizes="(min-width: 1204px) 33rem, (min-width: 800px) 46vw, 93vw"
        />
      ) : null}
    </section>
  );
}
