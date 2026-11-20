import type {
  PortableTextBlock,
  PortableTextComponents,
} from "@portabletext/react";
import type { ReactNode } from "react";

import { CodeBlock } from "@/components/code-block";
import { Figure } from "@/components/figure";
import { Table } from "@/components/table";
import { SanityLink } from "@/features/sanity/link";
import { imageProps } from "@/features/sanity/media/image";
import type { ARTICLE_QUERY_RESULT } from "@/features/sanity/sanity.types";
import { slugify } from "@studio/slug";

import { HeadingLink } from "./heading-link";

type ArticleBody = NonNullable<NonNullable<ARTICLE_QUERY_RESULT>["body"]>;

type BodyMember<Type extends ArticleBody[number]["_type"]> = Extract<
  ArticleBody[number],
  { _type: Type }
>;

function blockText(block: PortableTextBlock) {
  return block.children
    .map((child) => ("text" in child ? child.text : ""))
    .join("");
}

const labels = { copy: "Copy code", copied: "Copied", failed: "Copy failed" };

function heading(Tag: "h2" | "h3", className: string) {
  return function Heading({
    children,
    value,
  }: {
    children?: ReactNode;
    value: PortableTextBlock;
  }) {
    const id = slugify(blockText(value));

    return (
      <Tag
        className={`scroll-mt-[2lh] font-medium first:mt-0 ${className}`}
        id={id}
      >
        <HeadingLink id={id} label="Copy link to heading" labels={labels}>
          {children}
        </HeadingLink>
      </Tag>
    );
  };
}

export const richTextComponents: PortableTextComponents = {
  block: {
    normal: ({ children }) => <p className="mt-[1lh] first:mt-0">{children}</p>,
    h2: heading("h2", "mt-14 text-lg leading-snug tracking-[-0.01em]"),
    h3: heading(
      "h3",
      "mt-10 text-[1.0625rem] leading-snug sm:text-[0.9375rem]",
    ),
    blockquote: ({ children }) => (
      <blockquote className="mt-[1lh] border-l pl-[2ch] text-muted first:mt-0">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="mt-[1lh] list-disc pl-[2ch] marker:text-muted first:mt-0 site:pl-0">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="mt-[1lh] list-decimal pl-[3ch] tabular-nums marker:text-muted first:mt-0 site:pl-0">
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
      <code className="bg-foreground/5.5 px-[0.3em] py-[0.15em] font-mono text-[0.85em] whitespace-nowrap">
        {children}
      </code>
    ),
  },
  types: {
    image: ({ value }: { value: BodyMember<"image"> }) => (
      <Figure
        alt={value.alt ?? ""}
        caption={value.caption}
        className="mt-[2lh] first:mt-0"
        image={imageProps(value)}
        wide={value.wide ?? false}
      />
    ),
    code: ({ value }: { value: BodyMember<"code"> }) => (
      <CodeBlock
        className="mt-[1.5lh] first:mt-0"
        code={value.code ?? ""}
        labels={labels}
        lang={value.language}
      />
    ),
    tableBlock: ({ value }: { value: BodyMember<"tableBlock"> }) => {
      const [head, ...rows] = value.table?.rows ?? [];
      if (!head) return null;

      return (
        <Table
          caption={value.caption}
          className="mt-[2lh] first:mt-0"
          label="Table"
        >
          <thead>
            <tr>
              {head.cells?.map((cell, index) => (
                <th key={index} scope="col">
                  {cell}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row._key}>
                {row.cells?.map((cell, index) => (
                  <td key={index}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </Table>
      );
    },
  },
};
