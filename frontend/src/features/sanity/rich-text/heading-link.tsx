"use client";

import type { ReactNode } from "react";

import {
  type CopyLabels,
  CopyIcon,
  useCopyState,
} from "@/components/copy-button";
import { focus } from "@/components/link";

type HeadingLinkProps = {
  id: string;
  labels: CopyLabels;
  children: ReactNode;
};

export function HeadingLink({ id, labels, children }: HeadingLinkProps) {
  const [state, message, copy] = useCopyState(labels);

  return (
    <>
      <a
        className={`group/link relative underline-offset-4 focus-visible:underline ${focus}`}
        data-state={state}
        href={`#${id}`}
        onClick={() => copy(new URL(`#${id}`, window.location.href).href)}
      >
        <CopyIcon
          className="absolute top-1/2 right-full mr-[0.5em] size-[0.8em] -translate-y-1/2 text-muted opacity-0 transition-opacity group-hover/link:opacity-100 group-focus-visible/link:opacity-100 group-data-state/link:opacity-100"
          state={state}
        >
          <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
          <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
        </CopyIcon>
        {children}
      </a>
      <span className="sr-only" role="status">
        {message}
      </span>
    </>
  );
}
