import { PortableText, type PortableTextBlock } from "next-sanity";

import { SanityLink } from "@/features/sanity/link";

export function SimpleText({ value }: { value?: readonly unknown[] | null }) {
  return (
    <PortableText
      components={{
        block: {
          normal: ({ children }) => (
            <p className="site:col-[3/11] [p+&]:mt-[1lh]">{children}</p>
          ),
        },
        marks: {
          link: ({ children, value }) => (
            <SanityLink href={value?.href}>{children}</SanityLink>
          ),
        },
      }}
      value={(value ?? []) as PortableTextBlock[]}
    />
  );
}
