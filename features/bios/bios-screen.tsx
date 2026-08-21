"use client";

import { useEffect, useSyncExternalStore } from "react";

import { biosBootLog, biosError, biosScreen } from "@/features/bios/content";
import { cn } from "@/features/style/utils";

const toneClass = {
  dim: "text-bios-text",
  cyan: "text-bios-cyan",
  bright: "text-bios-bright",
} as const;

const ignoredKeys = new Set(["Tab", "Shift", "Control", "Alt", "Meta"]);

const subscribeToNothing = () => () => {};

function useRequestedRoute(): string {
  return useSyncExternalStore(
    subscribeToNothing,
    () => window.location.pathname,
    () => "/",
  );
}

export function BiosScreen() {
  const route = useRequestedRoute();

  useEffect(() => {
    function reboot() {
      window.location.assign(biosScreen.rebootHref);
    }

    function onKeyDown(event: KeyboardEvent) {
      if (ignoredKeys.has(event.key)) return;
      if (event.metaKey || event.ctrlKey || event.altKey) return;
      reboot();
    }

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("pointerdown", reboot);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("pointerdown", reboot);
    };
  }, []);

  return (
    <div className="flex h-full flex-col bg-bios-blue bg-[radial-gradient(ellipse_at_top,var(--color-bios-blue),var(--color-bios-blue-deep))] font-mono text-[clamp(0.75rem,2.4vw,0.85rem)]/[1.55]">
      <div className="flex shrink-0 items-center justify-between gap-6 bg-bios-bar px-3 py-1 font-semibold text-bios-bar-text">
        <span>{biosScreen.vendor}</span>
        <span>{biosScreen.version}</span>
      </div>

      <div className="flex-1 overflow-y-auto px-3 py-6 sm:px-6">
        <pre className="whitespace-pre-wrap wrap-anywhere">
          {biosBootLog.map((line, index) => (
            <span
              key={`boot-${index}`}
              className={cn("block", toneClass[line.tone])}
            >
              {line.text || " "}
            </span>
          ))}
          <span className="block text-bios-text">
            {"  Route 4 : "}
            <span>{route}</span>
            {"    None"}
          </span>
          {biosError.map((line, index) => (
            <span
              key={`error-${index}`}
              className={cn("block", toneClass[line.tone])}
            >
              {line.text || " "}
            </span>
          ))}
        </pre>
      </div>

      <div className="flex shrink-0 flex-wrap items-center justify-between gap-x-6 bg-bios-bar px-1 text-bios-bar-text">
        <a
          href={biosScreen.rebootHref}
          className="inline-flex min-h-12 items-center px-2 underline-offset-2 hover:underline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-bios-bar-text"
        >
          {biosScreen.rebootLabel}
        </a>
        <span className="px-2">{biosScreen.keyHints}</span>
      </div>
    </div>
  );
}
