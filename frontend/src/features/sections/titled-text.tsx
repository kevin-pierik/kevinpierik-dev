import { PortableText } from "next-sanity";

import {
  headingStyles,
  labels,
  richTextComponents,
} from "@/features/sanity/rich-text";
import { HeadingLink } from "@/features/sanity/rich-text/heading-link";
import { slugify } from "@studio/slug";

import type { SectionOf } from "./types";

export function TitledText({ _key, title, body }: SectionOf<"textSection">) {
  const titleId = slugify(title ?? "") || `text-${_key}`;

  return (
    <section
      aria-labelledby={titleId}
      className="mt-24 grid gap-8 first:mt-0 site:mt-40 site:grid-cols-[27.5fr_38.5fr] site:gap-16"
      data-full
    >
      <h2 className={headingStyles.section} id={titleId}>
        <HeadingLink id={titleId} label="Copy link to heading" labels={labels}>
          {title}
        </HeadingLink>
      </h2>
      <div className="text-[1.0625rem] leading-[1.625rem]">
        <PortableText components={richTextComponents} value={body ?? []} />
      </div>
    </section>
  );
}
