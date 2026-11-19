"use client";

import { Button } from "@ui-sdk/react/button";
import { type ReactNode, useEffect, useRef, useState } from "react";

import { focus } from "@/components/link";

type CopyState = "copied" | "failed";

export type CopyLabels = { copy: string; copied: string; failed: string };

export function useCopyState(labels: CopyLabels) {
  const [state, setState] = useState<{ value: CopyState; count: number }>();
  const count = useRef(0);
  const timeout = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => () => clearTimeout(timeout.current), []);

  async function copy(text: string) {
    let value: CopyState = "copied";
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      value = "failed";
    }
    clearTimeout(timeout.current);
    setState({ value, count: ++count.current });
    timeout.current = setTimeout(() => setState(undefined), 2000);
  }

  const message = state
    ? `${labels[state.value]}${state.count % 2 ? "" : " "}`
    : "";

  return [state?.value, message, copy] as const;
}

type CopyIconProps = {
  state?: CopyState;
  className?: string;
  children: ReactNode;
};

export function CopyIcon({ state, className, children }: CopyIconProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      viewBox="0 0 24 24"
    >
      {state === "copied" ? (
        <path d="M20 6 9 17l-5-5" />
      ) : state === "failed" ? (
        <path d="M18 6 6 18M6 6l12 12" />
      ) : (
        children
      )}
    </svg>
  );
}

type CopyButtonProps = {
  text: string;
  labels: CopyLabels;
  className?: string;
};

export function CopyButton({ text, labels, className }: CopyButtonProps) {
  const [state, message, copy] = useCopyState(labels);

  return (
    <span className={className}>
      <Button
        aria-label={labels.copy}
        className={`inline-flex size-8 items-center justify-center text-muted transition-colors hover:bg-subtle hover:text-foreground ${focus}`}
        onClick={() => copy(text)}
      >
        <CopyIcon className="size-3.5" state={state}>
          <rect height="14" rx="2" width="14" x="8" y="8" />
          <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
        </CopyIcon>
      </Button>
      <span className="sr-only" role="status">
        {message}
      </span>
    </span>
  );
}
