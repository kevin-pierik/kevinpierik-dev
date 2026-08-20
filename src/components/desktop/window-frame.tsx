"use client";

import { Minus, Plus } from "lucide-react";
import type { ReactNode } from "react";
import { useRef } from "react";

import { cn } from "@/lib/utils";

export type WindowOffset = { x: number; y: number };

type WindowFrameProps = {
  title: string;
  variant?: "default" | "document";
  offset: WindowOffset;
  depth: number;
  onMove: (next: (previous: WindowOffset) => WindowOffset) => void;
  onFocus: () => void;
  onClose: () => void;
  expanded?: boolean;
  onExpand?: () => void;
  children: ReactNode;
};

const STEP = 16;
const controlClassName =
  "relative grid aspect-square size-4 shrink-0 cursor-pointer place-items-center rounded-[50%] border border-transparent bg-paper p-0 text-ink transition-colors before:absolute before:-inset-2.5 hover:border-paper hover:bg-transparent hover:text-paper focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring";

export function WindowFrame({
  title,
  variant = "default",
  offset,
  depth,
  onMove,
  onFocus,
  onClose,
  expanded = false,
  onExpand,
  children,
}: WindowFrameProps) {
  const frame = useRef<HTMLDivElement>(null);
  const grab = useRef<WindowOffset>({ x: 0, y: 0 });

  function clamp(next: WindowOffset): WindowOffset {
    const element = frame.current;
    const bounds = element?.offsetParent?.getBoundingClientRect();
    if (!element || !bounds) return next;

    const rect = element.getBoundingClientRect();
    const restX = rect.left - offset.x - bounds.left;
    const restY = rect.top - offset.y - bounds.top;

    return {
      x: Math.min(Math.max(-restX, next.x), bounds.width - rect.width - restX),
      y: Math.min(Math.max(-restY, next.y), bounds.height - rect.height - restY),
    };
  }

  function onPointerDown(event: React.PointerEvent<HTMLDivElement>) {
    if (event.button !== 0) return;
    if ((event.target as HTMLElement).closest("button")) return;

    grab.current = { x: event.clientX - offset.x, y: event.clientY - offset.y };
    event.currentTarget.setPointerCapture(event.pointerId);
  }

  function onPointerMove(event: React.PointerEvent<HTMLDivElement>) {
    if (!event.currentTarget.hasPointerCapture(event.pointerId)) return;

    onMove(() =>
      clamp({
        x: event.clientX - grab.current.x,
        y: event.clientY - grab.current.y,
      }),
    );
  }

  function onKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    const deltas: Record<string, WindowOffset> = {
      ArrowUp: { x: 0, y: -STEP },
      ArrowDown: { x: 0, y: STEP },
      ArrowLeft: { x: -STEP, y: 0 },
      ArrowRight: { x: STEP, y: 0 },
    };

    const delta = deltas[event.key];
    if (!delta) return;

    event.preventDefault();
    onMove((previous) =>
      clamp({ x: previous.x + delta.x, y: previous.y + delta.y }),
    );
  }

  return (
    <div
      ref={frame}
      data-slot="window"
      onPointerDownCapture={variant === "default" ? onFocus : undefined}
      style={{
        transform:
          variant === "default"
            ? `translate(${offset.x}px, ${offset.y}px)`
            : undefined,
        zIndex: 10 + depth,
      }}
      className={cn(
        "absolute flex flex-col bg-background",
        variant === "document"
          ? "inset-0"
          : "top-1/2 left-1/2 w-[min(20rem,calc(100%-1rem))] -translate-x-1/2 -translate-y-1/2 px-1 pb-1 ring-1 ring-paper/25 sm:w-[25rem]",
      )}
    >
      <div
        className={cn(
          "flex h-8 shrink-0 items-center justify-between gap-3 px-2 select-none focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-ring",
          variant === "default" &&
            "cursor-grab touch-none active:cursor-grabbing",
        )}
        onPointerDown={variant === "default" ? onPointerDown : undefined}
        onPointerMove={variant === "default" ? onPointerMove : undefined}
        onKeyDown={variant === "default" ? onKeyDown : undefined}
        role="toolbar"
        aria-label={
          variant === "default"
            ? `${title} window, use the arrow keys to move`
            : `${title} window`
        }
        tabIndex={variant === "default" ? 0 : undefined}
      >
        <h2 className="truncate font-mono text-[11px]">
          {title}
        </h2>

        <div className="flex items-center gap-2">
          {variant === "document" && onExpand && (
            <button
              type="button"
              onClick={onExpand}
              aria-label={`${expanded ? "Collapse" : "Expand"} ${title}`}
              aria-pressed={expanded}
              className={cn(controlClassName, "hidden lg:grid")}
            >
              {expanded ? (
                <Minus aria-hidden className="size-2.5" strokeWidth={2} />
              ) : (
                <Plus aria-hidden className="size-2.5" strokeWidth={2} />
              )}
            </button>
          )}

          <button
            type="button"
            onClick={onClose}
            aria-label={`Close ${title}`}
            className={controlClassName}
          >
            <svg
              aria-hidden
              viewBox="0 0 12 12"
              className="block size-2.5"
              fill="none"
            >
              <path
                d="M2.25 2.25 9.75 9.75M9.75 2.25 2.25 9.75"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>
      </div>

      <div
        className={cn(
          "flex ring-1 ring-paper/25 [scrollbar-width:none]",
          variant === "document"
            ? "min-h-0 flex-1 flex-col overflow-hidden"
            : "max-h-[60svh] flex-col gap-3 overflow-y-auto p-3",
        )}
      >
        {children}
      </div>
    </div>
  );
}
