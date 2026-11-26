"use client";

import type { ReactNode } from "react";
import { Link } from "lucide-react";

import {
  type CopyLabels,
  CopyIcon,
  useCopyState,
} from "@/components/copy-button";
import { focusText } from "@/components/link";

type HeadingLinkProps = {
  as: "h2" | "h3" | "h4";
  id: string;
  className?: string;
  label: string;
  labels: CopyLabels;
  children: ReactNode;
};

export function HeadingLink({
  as: Heading,
  id,
  className = "",
  label,
  labels,
  children,
}: HeadingLinkProps) {
  const [state, message, copy] = useCopyState(labels);

  return (
    <div
      className={`group/heading flex items-baseline ${className}`}
      data-state={state}
    >
      <Heading className="scroll-mt-[2lh]" id={id}>
        {children}
      </Heading>
      <a
        aria-label={label}
        className={`ml-[0.25em] inline-flex shrink-0 text-muted opacity-0 transition-opacity group-hover/heading:opacity-100 group-data-state/heading:opacity-100 focus-visible:opacity-100 ${focusText}`}
        data-state={state}
        href={`#${id}`}
        onClick={() => copy(new URL(`#${id}`, window.location.href).href)}
      >
        <CopyIcon className="size-[0.5em]" icon={Link} state={state} />
      </a>
      <span className="sr-only" role="status">
        {message}
      </span>
    </div>
  );
}
