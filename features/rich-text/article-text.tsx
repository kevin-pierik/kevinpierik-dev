import { PortableText, type PortableTextComponents } from "@portabletext/react";
import Image from "next/image";

import type { PortableTextValue } from "@/features/rich-text/types";
import { urlForImage } from "@/features/sanity/image";

const linkStyle =
  "underline underline-offset-2 hover:decoration-dashed focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring";

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
        className={linkStyle}
      >
        {children}
      </a>
    ),
  },
  types: {
    codeBlock: ({ value }) => (
      <pre className="overflow-x-auto border border-paper/25 p-3 font-mono text-[11px]/relaxed text-mist">
        <code>{value?.code}</code>
      </pre>
    ),
    image: ({ value }) => {
      if (!value?.asset?._ref) return null;

      return (
        <figure className="flex flex-col gap-2">
          <Image
            src={urlForImage(value).width(1400).url()}
            alt={value.alt ?? ""}
            width={700}
            height={394}
            sizes="(max-width: 1024px) 100vw, 50rem"
            className="h-auto w-full border border-paper/25"
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
