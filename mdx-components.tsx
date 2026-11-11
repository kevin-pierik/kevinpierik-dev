import type { MDXComponents } from "mdx/types";
import type { ComponentProps, ReactNode } from "react";

export const linkClassName =
  "underline decoration-foreground/35 decoration-1 underline-offset-[0.25em] hover:decoration-foreground focus-visible:decoration-foreground focus-visible:outline-none";

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function Column({ className, children }: ComponentProps<"div">) {
  return (
    <div className={`flex flex-col gap-[1.35em] ${className ?? ""}`}>
      {children}
    </div>
  );
}

type SectionProps = {
  title: string;
  className?: string;
  children: ReactNode;
};

function Section({ title, className, children }: SectionProps) {
  const id = slugify(title);

  return (
    <section aria-labelledby={id} className={className}>
      <h2 className="text-[1em]/[inherit] font-bold uppercase" id={id}>
        {title}
      </h2>
      {children}
    </section>
  );
}

function Label({ children }: { children: ReactNode }) {
  return <span className="ml-[-3em] inline-block w-[3em]">{children}</span>;
}

const components: MDXComponents = {
  h3: ({ children, ...props }) => (
    <h3 className="text-[1em]/[inherit] font-bold" {...props}>
      {children}
    </h3>
  ),
  li: (props) => <li className="pl-[3em]" {...props} />,
  p: (props) => <p className="[p+&]:mt-[1.35em]" {...props} />,
  a: ({ children, ...props }) => (
    <a className={linkClassName} {...props}>
      {children}
    </a>
  ),
  Column,
  Section,
  Label,
};

export function useMDXComponents(): MDXComponents {
  return components;
}
