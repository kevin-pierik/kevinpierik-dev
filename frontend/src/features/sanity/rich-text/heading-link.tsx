"use client";

import type { ReactNode } from "react";

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
        <CopyIcon className="size-[0.8em]" state={state}>
          <path d="M288-288q-79.68 0-135.84-56.23Q96-400.45 96-480.23 96-560 152.16-616q56.16-56 135.84-56h108q15.3 0 25.65 10.29Q432-651.42 432-636.21t-10.35 25.71Q411.3-600 396-600H288q-50 0-85 35t-35 85q0 50 35 85t85 35h107.74q15.26 0 25.76 10.29 10.5 10.29 10.5 25.5t-10.35 25.71Q411.3-288 396-288H288Zm84.28-156q-15.28 0-25.78-10.29-10.5-10.29-10.5-25.5t10.34-25.71q10.34-10.5 25.62-10.5h215.76q15.28 0 25.78 10.29 10.5 10.29 10.5 25.5t-10.34 25.71Q603.32-444 588.04-444H372.28ZM564-288q-15.3 0-25.65-10.29Q528-308.58 528-323.79t10.35-25.71Q548.7-360 564-360h108q50 0 85-35t35-85q0-50-35-85t-85-35H564.26q-15.26 0-25.76-10.29-10.5-10.29-10.5-25.5t10.35-25.71Q548.7-672 564-672h108q79.68 0 135.84 56.23 56.16 56.22 56.16 136Q864-400 807.84-344 751.68-288 672-288H564Z" />
        </CopyIcon>
      </a>
      <span className="sr-only" role="status">
        {message}
      </span>
    </div>
  );
}
