import type { PortableTextBlock, PortableTextComponents } from "next-sanity";
import type { ReactNode } from "react";

import { SanityLink } from "@/features/sanity/link";
import { slugify } from "@studio/slug";

import { HeadingLink } from "./heading-link";

function blockText(block: PortableTextBlock) {
  return block.children
    .map((child) => ("text" in child ? child.text : ""))
    .join("");
}

export const labels = {
  copy: "Copy code",
  copied: "Copied",
  failed: "Copy failed",
};

const reservedIds = new Set([
  "main",
  "main-title",
  "page-title",
  "footer-title",
  "post-title",
  "site-menu",
]);

export function headingId(text: string | null | undefined, fallback: string) {
  const id = slugify(text ?? "");
  return id && !reservedIds.has(id) ? id : fallback;
}

function heading(Tag: "h2" | "h3" | "h4", className: string) {
  return function Heading({
    children,
    value,
  }: {
    children?: ReactNode;
    value: PortableTextBlock;
  }) {
    return (
      <HeadingLink
        as={Tag}
        className={`font-medium first:mt-0 ${className}`}
        id={headingId(blockText(value), `heading-${value._key}`)}
        label="Copy link to heading"
        labels={labels}
      >
        {children}
      </HeadingLink>
    );
  };
}

export const headingStyles = {
  h2: "mt-14 text-lg tracking-[-0.01em]",
  h3: "mt-10 text-base",
  section: "scroll-mt-[2lh] text-3xl tracking-[-0.01em] site:text-4xl",
};

const blocks = {
  normal: ({ children }) => <p className="mt-[1lh] first:mt-0">{children}</p>,
  h2: heading("h2", headingStyles.h2),
  h3: heading("h3", headingStyles.h3),
  blockquote: ({ children }) => (
    <blockquote className="mt-[1lh] border-l pl-[2ch] text-muted first:mt-0">
      {children}
    </blockquote>
  ),
} satisfies PortableTextComponents["block"];

export const richTextComponents: PortableTextComponents = {
  block: blocks,
  list: {
    bullet: ({ children }) => (
      <ul className="mt-[1lh] list-disc pl-[2ch] marker:text-muted first:mt-0">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="mt-[1lh] list-decimal pl-[3ch] tabular-nums marker:text-muted first:mt-0">
        {children}
      </ol>
    ),
  },
  listItem: ({ children }) => (
    <li className="[&+li]:mt-[0.25lh]">{children}</li>
  ),
  marks: {
    link: ({ children, value }) => (
      <SanityLink href={value?.href}>{children}</SanityLink>
    ),
    code: ({ children }) => (
      <code className="rounded-md bg-foreground/5.5 px-[0.3em] py-[0.15em] font-mono text-[0.85em] whitespace-nowrap">
        {children}
      </code>
    ),
  },
};

export const nestedRichTextComponents: PortableTextComponents = {
  ...richTextComponents,
  block: {
    ...blocks,
    h2: heading("h3", headingStyles.h2),
    h3: heading("h4", headingStyles.h3),
  },
};
