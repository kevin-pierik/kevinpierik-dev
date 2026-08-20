"use client";

import { File } from "lucide-react";
import type { ReactNode } from "react";
import { useState } from "react";

import type { WindowOffset } from "@/components/desktop/window-frame";
import { WindowFrame } from "@/components/desktop/window-frame";
import { desktopFiles } from "@/content/desktop";
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

  return (
    <div className="relative flex-1 overflow-hidden">
      <ul className="flex flex-col items-start gap-0.5 p-2">
        {desktopFiles.map((file) => {
          const isOpen = stack.includes(file.id);

          return (
            <li key={file.id}>
              <button
                type="button"
                onClick={() => toggle(file.id)}
                aria-pressed={isOpen}
                className="inline-flex min-h-7 items-center gap-2 px-1 font-mono text-xs tracking-[0.08em] text-mist transition-colors hover:text-paper focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
              >
                <File
                  aria-hidden
                  className={cn("size-3.5", isOpen && "fill-current")}
                />
                {file.label}
              </button>
            </li>
          );
        })}
      </ul>

      {desktopFiles.map((file) => {
        const depth = stack.indexOf(file.id);
        if (depth === -1) return null;

        const index = desktopFiles.findIndex((item) => item.id === file.id);

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
