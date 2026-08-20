"use client";

import type { ReactNode } from "react";
import { useRef } from "react";

export type WindowOffset = { x: number; y: number };

type WindowFrameProps = {
  title: string;
  offset: WindowOffset;
  depth: number;
  onMove: (next: (previous: WindowOffset) => WindowOffset) => void;
  onFocus: () => void;
  onClose: () => void;
  children: ReactNode;
};

const STEP = 16;

export function WindowFrame({
  title,
  offset,
  depth,
  onMove,
  onFocus,
  onClose,
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
      onPointerDownCapture={onFocus}
      style={{
        transform: `translate(${offset.x}px, ${offset.y}px)`,
        zIndex: 10 + depth,
      }}
      className="absolute top-1/2 left-1/2 flex w-[min(20rem,calc(100%-1rem))] -translate-x-1/2 -translate-y-1/2 flex-col bg-background px-1 pb-1 ring-1 ring-paper/25 sm:w-[25rem]"
    >
      <div
        className="flex h-8 shrink-0 cursor-grab touch-none items-center justify-between gap-3 px-2 select-none active:cursor-grabbing focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-ring"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onKeyDown={onKeyDown}
        role="toolbar"
        aria-label={`${title} window, use the arrow keys to move`}
        tabIndex={0}
      >
        <h2 className="truncate font-mono text-[11px]">
          {title}
        </h2>

        <button
          type="button"
          onClick={onClose}
          aria-label={`Close ${title}`}
          className="relative grid aspect-square size-4 shrink-0 cursor-pointer place-items-center rounded-[50%] border border-transparent bg-paper p-0 text-ink transition-colors before:absolute before:-inset-2.5 hover:border-paper hover:bg-transparent hover:text-paper focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
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

      <div className="flex max-h-[60svh] flex-col gap-3 overflow-y-auto p-3 ring-1 ring-paper/25 [scrollbar-width:none]">
        {children}
      </div>
    </div>
  );
}
