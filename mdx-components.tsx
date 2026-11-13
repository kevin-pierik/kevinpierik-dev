import type { MDXComponents } from "mdx/types";
import type { ComponentProps, ReactNode } from "react";

import { Link } from "@/components/link";

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function Column({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      className={`flex flex-col gap-[2.5lh] ${className ?? ""}`}
      {...props}
    />
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

type LabelProps = {
  title: string;
  children: ReactNode;
};

function Label({ title, children }: LabelProps) {
  return (
    <>
      <span aria-hidden="true" className="ml-[-3em] inline-block w-[3em]">
        {children}
      </span>
      <span className="sr-only">{title}: </span>
    </>
  );
}

function Contact({ children }: { children: ReactNode }) {
  return (
    <address className="not-italic [&_a:not(:hover)]:no-underline [&_li]:flex">
      {children}
    </address>
  );
}

const components: MDXComponents = {
  h3: ({ children, ...props }) => (
    <h3
      className="text-[1em]/[inherit] font-bold [h3~&]:mt-[0.75lh]"
      {...props}
    >
      {children}
    </h3>
  ),
  li: (props) => <li className="pl-[3em]" {...props} />,
  p: (props) => <p className="[p+&]:mt-[1lh]" {...props} />,
  a: ({ href = "", children, ...props }) => (
    <Link href={href} {...props}>
      {children}
    </Link>
  ),
  Column,
  Section,
  Label,
  Contact,
};

export function useMDXComponents(): MDXComponents {
  return components;
}
