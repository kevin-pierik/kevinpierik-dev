import { ArrowRight, ArrowUpRight } from "lucide-react";
import NextLink from "next/link";

import { focus } from "@/components/link";
import { safeHref } from "@/features/sanity/link/safe-href";
import { headingId, headingStyles, labels } from "@/features/sanity/rich-text";
import { HeadingLink } from "@/features/sanity/rich-text/heading-link";
import type { SectionOf } from "@/features/sections/types";

export function LinkCards({
  _key,
  eyebrow,
  title,
  text,
  links,
}: SectionOf<"linksSection">) {
  const cards = (links ?? []).flatMap(({ _key, label, link }) => {
    const href = safeHref(link);
    return href && label ? [{ _key, label, href }] : [];
  });
  if (cards.length === 0) return null;

  const titleId = headingId(title, `links-${_key}`);

  return (
    <section
      aria-labelledby={titleId}
      className="mt-24 grid items-start gap-8 first:mt-0 site:mt-40 site:grid-cols-2 site:gap-16"
      data-full
    >
      <div>
        {eyebrow ? <p className="mb-2 text-muted">{eyebrow}</p> : null}
        <HeadingLink
          as="h2"
          className={headingStyles.section}
          id={titleId}
          label="Copy link to heading"
          labels={labels}
        >
          {title}
        </HeadingLink>
        {text ? (
          <p className="mt-4 max-w-120 text-base leading-relaxed text-muted">
            {text}
          </p>
        ) : null}
      </div>
      <ul className="grid gap-3">
        {cards.map(({ _key, label, href }) => {
          const Arrow = href.startsWith("/") ? ArrowRight : ArrowUpRight;
          return (
            <li key={_key}>
              <NextLink
                className={`group flex min-h-16 items-center justify-between gap-4 rounded-2xl bg-subtle px-6 text-base transition-colors hover:bg-subtle-hover site:min-h-20 ${focus}`}
                href={href}
                prefetch={false}
              >
                {label}
                <Arrow
                  aria-hidden="true"
                  className="size-4 shrink-0 text-muted transition-colors group-hover:text-foreground"
                />
              </NextLink>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
