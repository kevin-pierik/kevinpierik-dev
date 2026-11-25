import { SanityLink } from "@/features/sanity/link";
import { headingStyles, labels } from "@/features/sanity/rich-text";
import { HeadingLink } from "@/features/sanity/rich-text/heading-link";
import { slugify } from "@studio/slug";

import { Accordion } from "./accordion";
import { Buttons } from "./buttons";
import type { SectionOf } from "./types";

export function List({
  _key,
  title,
  titleMuted,
  buttons,
  items,
}: SectionOf<"listSection">) {
  if (!items?.length) return null;

  const titleId = slugify(title ?? "") || `list-${_key}`;

  return (
    <section
      aria-labelledby={titleId}
      className="mt-24 grid gap-8 first:mt-0 site:mt-40 site:grid-cols-[27.5fr_38.5fr] site:gap-16"
      data-full
    >
      <div className="site:sticky site:top-32 site:self-start">
        <h2 className={headingStyles.section} id={titleId}>
          <HeadingLink
            id={titleId}
            label="Copy link to heading"
            labels={labels}
          >
            {title}
          </HeadingLink>
          {titleMuted ? (
            <>
              {" "}
              <span className="block text-muted">{titleMuted}</span>
            </>
          ) : null}
        </h2>
        <Buttons buttons={buttons} className="mt-8" />
      </div>
      <Accordion
        items={items.map((item) => {
          const link = (text: string | null) => (
            <SanityLink
              className="pointer-events-auto -my-px inline-block py-px"
              href={item.link}
              variant="nav"
            >
              {text}
            </SanityLink>
          );

          return {
            key: item._key,
            title: [item.title, item.organization].filter(Boolean).join(" at "),
            heading: (
              <>
                {item.period ? (
                  <span className="text-muted tabular-nums">{item.period}</span>
                ) : null}
                <span>
                  {item.organization ? (
                    <>
                      {item.title} at {link(item.organization)}
                    </>
                  ) : (
                    link(item.title)
                  )}
                </span>
              </>
            ),
            panel: (
              <div className="grid gap-y-3.5 px-5 pb-5 site:px-6 site:pb-6">
                {item.description ? (
                  <p className="max-w-[60ch] text-muted">{item.description}</p>
                ) : null}
                {item.location ? (
                  <p className="text-muted">{item.location}</p>
                ) : null}
                {item.tags?.length ? (
                  <ul
                    aria-label="Skills"
                    className="flex flex-wrap gap-2 pt-2 text-[0.8125rem] leading-5"
                  >
                    {item.tags.map((tag) => (
                      <li
                        className="rounded-full bg-background px-2.5 py-0.5"
                        key={tag}
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
            ),
          };
        })}
        label={title ?? undefined}
      />
    </section>
  );
}
