import { Buttons } from "./buttons";
import { Media } from "./media";
import type { SectionOf } from "./types";

export const heroTitleId = "page-title";

const eyebrowIcons = {
  rocket:
    "M319-521q14-28 30.5-54.5T384-628l-55-7-88 88 78 26Zm455-270q-79 2-148 41t-125 96q-38 38-68 81t-54 91l102 102q48-24 91-54t81-68q57-57 97.5-129T791-775q0-3-1.5-6t-3.5-5q-2-3-5-4t-7-1ZM528-600q0-30 21-51t51-21q30 0 51 21t21 51q0 30-21 51t-51 21q-30 0-51-21t-21-51Zm-7 281 26 78 88-88-7-55q-26 18-52.5 34.5T521-319Zm340-504q13 104-31.5 198T710-456l-8.5 8.5Q698-444 694-439l12 101q2 17-3.5 33T685-278L552-145q-14 13-31.5 9.5T498-156l-51-155-135-136-156-53q-17-5-20-22.5t10-30.5l132-133q12-12 27.5-17.5T338-707l101 13q5-5 9.5-9t9.5-9q75-74 168-119t196-31q8 1 14.5 5t11.5 9q5 5 8.5 11t4.5 14ZM178-331q31-32 75-30.5t76 33.5q31 31 32.5 74T332-181q-45 47-108.5 60.5T96-96q11-63 24-126.5T178-331Zm45 57q-17 17-23 40l-12 46q23-6 45-12t39-23q13-11 14.5-27.5T277-278q-11-11-27-9.5T223-274Z",
};

export function Hero({
  eyebrow,
  eyebrowIcon,
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
  const icon = eyebrowIcon ? (
    <svg
      aria-hidden="true"
      className="mr-1.5 inline size-[1.15em] align-[-0.2em]"
      fill="currentColor"
      viewBox="0 -960 960 960"
    >
      <path d={eyebrowIcons[eyebrowIcon]} />
    </svg>
  ) : null;

  return (
    <section
      className={`${small ? "pt-18 not-last:pb-12 site:pt-30 site:not-last:pb-16" : "min-h-[calc(100svh-5.75rem)] py-18 site:min-h-[calc(100svh-6.25rem)] site:py-24"} ${hasImage ? "grid content-center items-center gap-10 site:grid-cols-2 site:gap-16" : small ? "" : "flex flex-col justify-center"}`}
    >
      <div className={centered ? "text-center" : "max-w-xl"}>
        {eyebrow ? (
          small ? (
            <p className="mb-5">
              <span className="inline-block rounded-full bg-subtle px-3 py-1 text-sm">
                {icon}
                {eyebrow}
              </span>
            </p>
          ) : (
            <p className="mb-6 text-base leading-relaxed text-muted site:mb-8">
              {icon}
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
