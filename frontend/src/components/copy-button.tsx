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
      fill="currentColor"
      viewBox="0 -960 960 960"
    >
      {state === "copied" ? (
        <path d="m389-369 299-299q11-11 25.5-11t25.5 11q11 11 11 25.5T739-617L415-292q-11 11-25.5 11T364-292L221-435q-11-11-11-25.5t11-25.5q11-11 25.5-11t25.5 11l117 117Z" />
      ) : state === "failed" ? (
        <path d="M480-429 316-265q-11 11-25 10.5T266-266q-11-11-11-25.5t11-25.5l163-163-164-164q-11-11-10.5-25.5T266-695q11-11 25.5-11t25.5 11l163 164 164-164q11-11 25.5-11t25.5 11q11 11 11 25.5T695-644L531-480l164 164q11 11 11 25t-11 25q-11 11-25.5 11T644-266L480-429Z" />
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
        className={`inline-flex size-8 items-center justify-center rounded-[10px] text-muted transition-colors hover:text-foreground pointer-coarse:size-11 ${focus}`}
        onClick={() => copy(text)}
      >
        <CopyIcon className="size-4.5" state={state}>
          <path d="M360-240q-29.7 0-50.85-21.15Q288-282.3 288-312v-480q0-29.7 21.15-50.85Q330.3-864 360-864h384q29.7 0 50.85 21.15Q816-821.7 816-792v480q0 29.7-21.15 50.85Q773.7-240 744-240H360Zm0-72h384v-480H360v480ZM216-96q-29.7 0-50.85-21.15Q144-138.3 144-168v-516q0-15.3 10.29-25.65Q164.58-720 179.79-720t25.71 10.35Q216-699.3 216-684v516h420q15.3 0 25.65 10.29Q672-147.42 672-132.21t-10.35 25.71Q651.3-96 636-96H216Zm144-216v-480 480Z" />
        </CopyIcon>
      </Button>
      <span className="sr-only" role="status">
        {message}
      </span>
    </span>
  );
}
