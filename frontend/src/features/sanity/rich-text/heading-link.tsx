"use client";

import type { ReactNode } from "react";

import {
  type CopyLabels,
  CopyIcon,
  useCopyState,
} from "@/components/copy-button";
import { focusText } from "@/components/link";

type HeadingLinkProps = {
  id: string;
  label: string;
  labels: CopyLabels;
  children: ReactNode;
};

export function HeadingLink({ id, label, labels, children }: HeadingLinkProps) {
  const [state, message, copy] = useCopyState(labels);

  return (
    <>
      <span className="group/heading" data-state={state}>
        {children}
        <a
          aria-label={label}
          className={`ml-[0.5em] inline-flex align-middle text-muted opacity-0 transition-opacity group-hover/heading:opacity-100 group-data-state/heading:opacity-100 focus-visible:opacity-100 ${focusText}`}
          data-state={state}
          href={`#${id}`}
          onClick={() => copy(new URL(`#${id}`, window.location.href).href)}
        >
          <CopyIcon className="size-[0.8em]" state={state}>
            <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
            <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
          </CopyIcon>
        </a>
      </span>
      <span className="sr-only" role="status">
        {message}
      </span>
    </>
  );
}
