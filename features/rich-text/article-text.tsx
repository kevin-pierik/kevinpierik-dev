import { PortableText, type PortableTextComponents } from "@portabletext/react";

import { linkVariants } from "@/components/link";
import { SanityImage } from "@/components/sanity-image";
import type { PortableTextValue } from "@/features/rich-text/types";

const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => <p>{children}</p>,
    h2: ({ children }) => (
      <h2 className="mt-[1.6em] font-mono text-xs/relaxed tracking-[0.08em] text-paper uppercase first:mt-0">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="mt-[1.2em] font-mono text-xs/relaxed text-paper first:mt-0">
        {children}
      </h3>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l border-paper/25 pl-4 text-paper/80 italic">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="flex list-disc flex-col gap-[0.4em] pl-5">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="flex list-decimal flex-col gap-[0.4em] pl-5">
        {children}
      </ol>
    ),
  },
  marks: {
    code: ({ children }) => (
      <code className="bg-paper/10 px-1 font-mono text-[0.9em] text-paper">
        {children}
      </code>
    ),
    link: ({ value, children }) => (
      <a
        href={value?.href}
        draggable={false}
        target={value?.openInNewTab ? "_blank" : undefined}
        rel={value?.openInNewTab ? "noreferrer" : undefined}
        className={linkVariants()}
      >
        {children}
      </a>
    ),
  },
  types: {
    linkRow: ({ value }) => (
      <ul className="flex flex-wrap items-center gap-x-4 gap-y-1 text-paper/45">
        {(value?.links ?? []).map(
          (link: { _key: string; label?: string; href?: string }) => (
            <li key={link._key}>
              <a
                href={link.href}
                draggable={false}
                className="transition-colors hover:text-paper focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
              >
                {link.label}
              </a>
            </li>
          ),
        )}
      </ul>
    ),
    entryList: ({ value }) => (
      <section className="flex flex-col gap-[1em]">
        <h2 className="font-mono text-xs tracking-[0.08em] text-paper uppercase">
          {value?.title}
        </h2>
        <dl className="flex flex-col gap-[0.9em]">
          {(value?.entries ?? []).map(
            (entry: {
              _key: string;
              meta?: string;
              title?: string;
              description?: string;
              href?: string;
            }) => (
              <div key={entry._key} className="flex flex-col">
                {entry.meta && (
                  <dt className="font-mono text-[11px] text-paper/45">
                    {entry.meta}
                  </dt>
                )}
                <dd className="text-paper">
                  {entry.href ? (
                    <a
                      href={entry.href}
                      draggable={false}
                      className={linkVariants()}
                    >
                      {entry.title}
                    </a>
                  ) : (
                    entry.title
                  )}
                </dd>
                {entry.description && (
                  <dd className="text-paper/45">{entry.description}</dd>
                )}
              </div>
            ),
          )}
        </dl>
      </section>
    ),
    codeBlock: ({ value }) => (
      <pre className="overflow-x-auto border border-paper/25 p-3 font-mono text-[11px]/relaxed text-mist">
        <code>{value?.code}</code>
      </pre>
    ),
    image: ({ value }) => {
      if (!value?.asset?._ref) return null;

      return (
        <figure className="flex flex-col gap-2">
          <SanityImage
            value={value}
            sizes="(max-width: 1024px) 100vw, 50rem"
            className="border border-paper/25"
          />
          {value.caption && (
            <figcaption className="font-mono text-[11px] text-mist">
              {value.caption}
            </figcaption>
          )}
        </figure>
      );
    },
  },
};

type ArticleTextProps = {
  value: PortableTextValue;
};

export function ArticleText({ value }: ArticleTextProps) {
  return (
    <div
      data-slot="article-text"
      className="flex flex-col gap-[1em] font-sans text-sm/[1.7] text-paper/85"
    >
      <PortableText value={value} components={components} />
    </div>
  );
}
