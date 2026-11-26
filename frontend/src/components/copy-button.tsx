"use client";

import { Button } from "@ui-sdk/react/button";
import { useEffect, useRef, useState } from "react";
import { Check, Copy, type LucideIcon, X } from "lucide-react";

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
  icon: LucideIcon;
  className?: string;
};

export function CopyIcon({ state, icon, className }: CopyIconProps) {
  const Icon = state === "copied" ? Check : state === "failed" ? X : icon;
  return <Icon className={className} />;
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
        className={`inline-flex size-8 items-center justify-center rounded-full text-muted transition-colors hover:text-foreground pointer-coarse:size-11 ${focus}`}
        onClick={() => copy(text)}
      >
        <CopyIcon className="size-4" icon={Copy} state={state} />
      </Button>
      <span className="sr-only" role="status">
        {message}
      </span>
    </span>
  );
}
