"use client";

import { File } from "lucide-react";
import type { ReactNode } from "react";
import { useState } from "react";

import type { WindowOffset } from "@/components/desktop/window-frame";
import { WindowFrame } from "@/components/desktop/window-frame";
import { desktopWindows } from "@/content/desktop";
import { cn } from "@/lib/utils";

const CASCADE = 22;

type DesktopProps = {
  content: Record<string, ReactNode>;
};

export function Desktop({ content }: DesktopProps) {
  const [stack, setStack] = useState<string[]>(["about"]);
  const [offsets, setOffsets] = useState<Record<string, WindowOffset>>({});

  function toggle(id: string) {
    setStack((previous) =>
      previous.includes(id)
        ? previous.filter((item) => item !== id)
        : [...previous, id],
    );
  }

  function focus(id: string) {
    setStack((previous) =>
      previous.at(-1) === id
        ? previous
        : [...previous.filter((item) => item !== id), id],
    );
  }

  function move(id: string, index: number) {
    return (next: (previous: WindowOffset) => WindowOffset) =>
      setOffsets((previous) => ({
        ...previous,
        [id]: next(previous[id] ?? initialOffset(index)),
      }));
  }

  function initialOffset(index: number): WindowOffset {
    return { x: index * CASCADE, y: index * CASCADE };
  }

  const files = desktopWindows.filter((item) => item.placement === "files");
  const corner = desktopWindows.filter((item) => item.placement === "corner");

  return (
    <div className="relative flex-1 overflow-hidden border-x border-b border-paper/20">
      <ul className="flex flex-col items-start gap-0.5 p-2">
        {files.map((file) => {
          const isOpen = stack.includes(file.id);

          return (
            <li key={file.id}>
              <button
                type="button"
                onClick={() => toggle(file.id)}
                aria-pressed={isOpen}
                className="inline-flex min-h-6 items-center gap-1.5 px-1 font-mono text-[11px] text-mist transition-colors hover:text-paper focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
              >
                <File
                  aria-hidden
                  className={cn("size-3", isOpen && "fill-current")}
                />
                {file.label}
              </button>
            </li>
          );
        })}
      </ul>

      <div className="absolute right-3 bottom-2 flex items-center gap-3">
        {corner.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => toggle(item.id)}
            aria-pressed={stack.includes(item.id)}
            className="inline-flex min-h-6 items-center font-mono text-[11px] text-mist underline underline-offset-2 transition-colors hover:text-paper hover:decoration-dashed focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          >
            {item.label}
          </button>
        ))}
      </div>

      {desktopWindows.map((file) => {
        const depth = stack.indexOf(file.id);
        if (depth === -1) return null;

        const index = desktopWindows.findIndex((item) => item.id === file.id);

        return (
          <WindowFrame
            key={file.id}
            title={file.title}
            offset={offsets[file.id] ?? initialOffset(index)}
            depth={depth}
            onMove={move(file.id, index)}
            onFocus={() => focus(file.id)}
            onClose={() => toggle(file.id)}
          >
            {content[file.id]}
          </WindowFrame>
        );
      })}
    </div>
  );
}
