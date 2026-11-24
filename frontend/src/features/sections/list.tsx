import { SanityLink } from "@/features/sanity/link";
import { headingStyles, labels } from "@/features/sanity/rich-text";
import { HeadingLink } from "@/features/sanity/rich-text/heading-link";
import { slugify } from "@studio/slug";

import type { SectionOf } from "./types";

export function List({ _key, title, items }: SectionOf<"listSection">) {
  if (!items?.length) return null;

  const titleId = slugify(title ?? "") || `list-${_key}`;

  return (
    <>
      <h2
        className={`scroll-mt-[2lh] font-medium first:mt-0 ${headingStyles.h2}`}
        id={titleId}
      >
        <HeadingLink id={titleId} label="Copy link to heading" labels={labels}>
          {title}
        </HeadingLink>
      </h2>
      <ol
        aria-label={title ?? undefined}
        className="mt-[1lh] site:grid-site"
        data-full
      >
        {items.map((item) => (
          <li
            className="grid site:col-span-full site:grid-site [&+&]:mt-[1lh]"
            key={item._key}
          >
            {item.period ? (
              <p className="text-muted tabular-nums site:col-[3/5]">
                {item.period}
              </p>
            ) : null}
            <div className="site:col-[5/11]">
              <h3>
                <SanityLink href={item.link} variant="nav">
                  {item.title}
                </SanityLink>
              </h3>
              {item.description ? (
                <p className="max-w-[65ch] text-muted">{item.description}</p>
              ) : null}
              {item.location ? (
                <p className="text-muted">{item.location}</p>
              ) : null}
            </div>
          </li>
        ))}
      </ol>
    </>
  );
}
