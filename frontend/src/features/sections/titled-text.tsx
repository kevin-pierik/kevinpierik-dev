import { PortableText } from "next-sanity";

import {
  headingId,
  headingStyles,
  labels,
  nestedRichTextComponents,
} from "@/features/sanity/rich-text";
import { HeadingLink } from "@/features/sanity/rich-text/heading-link";

import type { SectionOf } from "./types";

export function TitledText({ _key, title, body }: SectionOf<"textSection">) {
  const titleId = headingId(title, `text-${_key}`);

  return (
    <section
      aria-labelledby={titleId}
      className="mt-24 grid gap-8 first:mt-0 site:mt-40 site:grid-cols-[27.5fr_38.5fr] site:gap-16"
      data-full
    >
      <HeadingLink
        as="h2"
        className={headingStyles.section}
        id={titleId}
        label="Copy link to heading"
        labels={labels}
      >
        {title}
      </HeadingLink>
      <div className="text-base leading-relaxed">
        <PortableText
          components={nestedRichTextComponents}
          value={body ?? []}
        />
      </div>
    </section>
  );
}
