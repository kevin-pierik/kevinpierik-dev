import type { MDXComponents } from "mdx/types";
import type { ReactNode } from "react";

import { Link } from "@/components/link";

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

type SectionProps = {
  title: string;
  children: ReactNode;
};

function Section({ title, children }: SectionProps) {
  const id = slugify(title);

  return (
    <section aria-labelledby={id} className="mt-[6lh] [&+&]:mt-[3lh]">
      <h2 className="mb-[1lh]" id={id}>
        {title}:
      </h2>
      {children}
    </section>
  );
}

function year(date: string) {
  return date.slice(0, 4);
}

type EntryProps = {
  title: string;
  href?: string;
  start: string;
  end?: string;
  location: string;
  children?: ReactNode;
};

function Entry({ title, href, start, end, location, children }: EntryProps) {
  return (
    <div className="grid grid-cols-[7rem_1fr] gap-x-4 max-sm:grid-cols-1 [&+&]:mt-[1lh]">
      <h3 className="sm:col-start-2">
        {href ? (
          <Link href={href} variant="nav">
            {title}
            <span aria-hidden="true" className="ml-0.5 text-muted">
              ↗
            </span>
          </Link>
        ) : (
          title
        )}
      </h3>
      <p className="text-muted tabular-nums max-sm:order-first sm:col-start-1 sm:row-start-1">
        <time dateTime={start}>{year(start)}</time>
        {end === "present" ? (
          " – Present"
        ) : end ? (
          <>
            {" – "}
            <time dateTime={end}>{year(end)}</time>
          </>
        ) : null}
      </p>
      <div className="text-muted sm:col-start-2">
        {children ? <div>{children}</div> : null}
        <div>{location}</div>
      </div>
    </div>
  );
}

function Intro({ children }: { children: ReactNode }) {
  return <div className="max-w-[36rem] text-muted">{children}</div>;
}

function Contact({ children }: { children: ReactNode }) {
  return (
    <address className="not-italic [&_li]:grid [&_li]:grid-cols-[7rem_1fr] [&_li]:gap-x-4 [&_li+li]:mt-0.5">
      {children}
    </address>
  );
}

function Label({ children }: { children: ReactNode }) {
  return <span className="text-muted">{children}</span>;
}

const components: MDXComponents = {
  p: (props) => <p className="[p+&]:mt-[1lh]" {...props} />,
  a: ({ href = "", children, ...props }) => (
    <Link href={href} {...props}>
      {children}
    </Link>
  ),
  Intro,
  Section,
  Entry,
  Contact,
  Label,
};

export function useMDXComponents(): MDXComponents {
  return components;
}
