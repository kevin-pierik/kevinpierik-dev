"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import { SanityImage } from "@/components/sanity-image";
import type { SidebarEntry } from "@/features/desktop/desktop";
import { cn } from "@/features/style/utils";

const COLUMNS = 2;

const greatestCommonDivisor = (a: number, b: number): number =>
  b === 0 ? a : greatestCommonDivisor(b, a % b);

type TileProps = {
  entry: SidebarEntry;
  active: boolean;
  reachable: boolean;
};

export function WorkTile({ entry, active, reachable }: TileProps) {
  return (
    <Link
      href={entry.href}
      tabIndex={reachable ? undefined : -1}
      aria-current={reachable && active ? "page" : undefined}
      className="block focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
    >
      {entry.cover ? (
        <span className="relative block aspect-square overflow-hidden bg-paper/6">
          <span className="absolute inset-[7%] flex items-center justify-center">
            <SanityImage
              value={entry.cover}
              sizes="(max-width: 1024px) 50vw, 40vw"
              className="h-full w-full object-contain"
            />
          </span>
          <span className="sr-only">{entry.label}</span>
        </span>
      ) : (
        <span
          className={cn(
            "flex aspect-square flex-col items-center justify-center gap-1 border px-3 text-center transition-colors",
            active
              ? "border-paper/60"
              : "border-paper/25 hover:border-paper/50",
          )}
        >
          <span className="text-[1.15em]/[1.2] font-semibold text-paper">
            {entry.label}
          </span>
          {entry.itemCount ? (
            <span className="font-mono text-[11px] text-mist/60">
              {entry.itemCount} {entry.itemCount === 1 ? "item" : "items"}
            </span>
          ) : null}
        </span>
      )}
    </Link>
  );
}

type WorksRailProps = {
  entries: SidebarEntry[];
  activeId?: string;
};

export function WorksRail({ entries, activeId }: WorksRailProps) {
  const scroller = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [units, setUnits] = useState(3);

  const count = entries.length;
  const cellsPerUnit =
    count === 0 ? 0 : (COLUMNS * count) / greatestCommonDivisor(COLUMNS, count);

  useEffect(() => {
    const element = scroller.current;
    const list = track.current;
    if (!element || !list || cellsPerUnit === 0) return;

    const scrollerElement = element;
    let pitch = 0;

    function measure() {
      const blocks = list?.children;
      if (!blocks || blocks.length < 2) return;

      const first = blocks[0] as HTMLElement;
      const second = blocks[1] as HTMLElement;
      pitch = second.offsetTop - first.offsetTop;
      if (pitch <= 0) return;

      const needed = Math.ceil(scrollerElement.clientHeight / pitch) + 2;
      setUnits((value) => (value >= needed ? value : needed));
      if (scrollerElement.scrollTop < pitch) scrollerElement.scrollTop = pitch;
    }

    function wrap() {
      if (pitch <= 0) return;

      const max = scrollerElement.scrollHeight - scrollerElement.clientHeight;
      if (scrollerElement.scrollTop < pitch * 0.5) {
        scrollerElement.scrollTop += pitch;
      } else if (scrollerElement.scrollTop > max - pitch * 0.5) {
        scrollerElement.scrollTop -= pitch;
      }
    }

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(scrollerElement);
    scrollerElement.addEventListener("scroll", wrap, { passive: true });

    return () => {
      observer.disconnect();
      scrollerElement.removeEventListener("scroll", wrap);
    };
  }, [cellsPerUnit, units]);

  if (count === 0) return null;

  return (
    <div
      ref={scroller}
      className="min-h-0 flex-1 overflow-y-auto overscroll-contain [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
    >
      <div ref={track} className="flex flex-col gap-1.5 p-1.5">
        {Array.from({ length: units }, (_, unit) => (
          <ul key={unit} className="grid grid-cols-2 gap-1.5">
            {Array.from({ length: cellsPerUnit }, (_, cell) => {
              const entry = entries[cell % count];
              const primary = unit === 0 && cell < count;

              return (
                <li
                  key={`${unit}-${cell}`}
                  aria-hidden={primary ? undefined : true}
                >
                  <WorkTile
                    entry={entry}
                    active={entry.id === activeId}
                    reachable={primary}
                  />
                </li>
              );
            })}
          </ul>
        ))}
      </div>
    </div>
  );
}
