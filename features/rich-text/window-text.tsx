import { PortableText, type PortableTextComponents } from "@portabletext/react";

import type { PortableTextValue } from "@/features/rich-text/types";

const linkStyle =
  "underline underline-offset-2 hover:decoration-dashed focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring";

const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => <p>{children}</p>,
  },
  marks: {
    link: ({ value, children }) => (
      <a
        href={value?.href}
        draggable={false}
        target={value?.openInNewTab ? "_blank" : undefined}
        rel={value?.openInNewTab ? "me noreferrer" : undefined}
        className={linkStyle}
      >
        {children}
      </a>
    ),
  },
};

type WindowTextProps = {
  value: PortableTextValue;
  signature?: string;
};

export function WindowText({ value, signature }: WindowTextProps) {
  return (
    <div
      data-slot="window-text"
      className="flex flex-col gap-[1em] font-mono text-xs/relaxed"
    >
      <PortableText value={value} components={components} />

      {signature && <p className="text-mist">{signature}</p>}
    </div>
  );
}
