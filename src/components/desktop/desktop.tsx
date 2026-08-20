"use client";

import { File, Folder, Minus, Plus } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";
import { useState } from "react";

import { InfiniteDesk } from "@/components/desktop/infinite-desk";
import type { WindowOffset } from "@/components/desktop/window-frame";
import { WindowFrame } from "@/components/desktop/window-frame";
import { desktopWindows } from "@/content/desktop";
import { cn } from "@/lib/utils";

const CASCADE = 22;

type DesktopMode = "home" | "portfolio";

type DesktopProps = {
  mode: DesktopMode;
  name: string;
  status: ReactNode;
  content: Record<string, ReactNode>;
};

const navigation = [
  { mode: "home", href: "/", label: "Home" },
  { mode: "portfolio", href: "/portfolio", label: "Portfolio" },
] as const;

export function Desktop({ mode, name, status, content }: DesktopProps) {
  const [stack, setStack] = useState<string[]>(mode === "home" ? ["about"] : []);
  const [offsets, setOffsets] = useState<Record<string, WindowOffset>>({});
  const [projectsExpanded, setProjectsExpanded] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

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

  const projects = desktopWindows.filter((item) => item.placement === "project");
  const files = desktopWindows.filter((item) => item.placement === "home");
  const corner = desktopWindows.filter((item) => item.placement === "corner");
  const visibleWindows = desktopWindows.filter(
    (item) =>
      item.placement === "corner" ||
      (mode === "home" && item.placement === "home") ||
      (mode === "portfolio" && item.placement === "project"),
  );

  return (
    <div
      className={cn(
        "relative grid h-full grid-cols-[auto_1fr] grid-rows-[2.25rem_minmax(0,1fr)] gap-x-3 lg:grid-cols-12 lg:gap-x-4",
        (mode === "home" || projectsExpanded) &&
          "before:pointer-events-none before:absolute before:inset-x-0 before:top-9 before:z-40 before:border-b before:border-paper/15",
      )}
    >
      <nav
        aria-label="Main navigation"
        className={cn(
          "col-start-1 row-start-1 hidden min-w-40 items-center gap-4 px-2 lg:col-span-4 lg:flex",
          mode === "portfolio" &&
            !projectsExpanded &&
            "border-b border-paper/15",
        )}
      >
        {navigation.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            aria-current={mode === item.mode ? "page" : undefined}
            className={cn(
              "font-mono text-xs transition-colors hover:text-paper focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
              mode === item.mode ? "text-paper" : "text-foreground/70",
            )}
          >
            {item.label}
          </Link>
        ))}
      </nav>

      <header
        className={cn(
          "col-span-2 col-start-1 row-start-1 flex items-center justify-between gap-4 px-2 lg:col-span-8 lg:col-start-5",
          mode === "portfolio" &&
            !projectsExpanded &&
            "border-b border-paper/15",
        )}
      >
        <h1 className="font-mono text-xs tracking-[0.08em]">{name}</h1>
        <div className="hidden lg:block">{status}</div>
        <button
          type="button"
          onClick={() => setMenuOpen((previous) => !previous)}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          className="font-mono text-xs text-paper focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring lg:hidden"
        >
          {menuOpen ? "Close Menu" : "Open Menu"}
        </button>
      </header>

      {menuOpen && (
        <nav
          id="mobile-menu"
          aria-label="Mobile navigation"
          className="absolute inset-x-0 top-9 bottom-0 z-50 flex flex-col border-x border-b border-paper/25 bg-ink-deep/95 p-2 backdrop-blur-[1px] lg:hidden"
        >
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              aria-current={mode === item.mode ? "page" : undefined}
              className={cn(
                "flex min-h-6 items-center font-mono text-xs transition-colors hover:text-paper focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
                mode === item.mode ? "text-paper" : "text-mist/70",
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      )}

      {mode === "portfolio" && (
        <aside
          className={cn(
            "col-span-2 col-start-1 row-start-2 flex min-w-40 flex-col overflow-hidden border-x border-b border-paper/20 lg:col-start-1",
            projectsExpanded ? "lg:col-span-12" : "lg:col-span-4",
          )}
        >
          <div className="flex h-7 items-center justify-between border-b border-paper/20 px-2 font-mono text-[11px] text-mist">
            <p>[{String(projects.length).padStart(2, "0")}]</p>

            <button
              type="button"
              onClick={() => setProjectsExpanded((previous) => !previous)}
              aria-label={projectsExpanded ? "Collapse portfolio" : "Expand portfolio"}
              aria-pressed={projectsExpanded}
              className="relative hidden size-3.5 shrink-0 cursor-pointer items-center justify-center rounded-full bg-paper text-ink before:absolute before:-inset-2.5 hover:bg-mist focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring lg:flex"
            >
              {projectsExpanded ? (
                <Minus aria-hidden className="size-2.5" strokeWidth={2} />
              ) : (
                <Plus aria-hidden className="size-2.5" strokeWidth={2} />
              )}
            </button>
          </div>

          <ul>
            {projects.map((project) => {
              const isOpen = stack.includes(project.id);

              return (
                <li key={project.id} className="border-b border-paper/20 px-1">
                  <button
                    type="button"
                    onClick={() => toggle(project.id)}
                    aria-pressed={isOpen}
                    className={cn(
                      "flex min-h-7 w-full items-center gap-1.5 px-1 font-mono text-[11px] transition-colors hover:bg-paper/8 hover:text-paper focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-ring",
                      isOpen ? "bg-paper/10 text-paper" : "text-mist",
                    )}
                  >
                    <Folder
                      aria-hidden
                      className={cn("size-3", isOpen && "fill-current")}
                    />
                    {project.label}
                  </button>
                </li>
              );
            })}

            {projects.length === 0 && (
              <li className="flex min-h-7 items-center gap-1.5 border-b border-paper/20 px-2 font-mono text-[11px] text-foreground/70">
                <Folder aria-hidden className="size-3" />
                Nothing here...
              </li>
            )}
          </ul>

          <p className="mt-auto p-2 font-mono text-[11px] text-mist">
            &copy; {new Date().getFullYear()} {name}.
          </p>
        </aside>
      )}

      <section
        className={cn(
          "relative row-start-2 overflow-hidden border-x border-b border-paper/20",
          mode === "home"
            ? "col-span-2 col-start-1 lg:col-span-12"
            : "hidden lg:col-start-5 lg:block lg:col-span-8",
          mode === "portfolio" && projectsExpanded && "lg:hidden",
        )}
      >
        <InfiniteDesk />

        {mode === "home" && (
          <ul className="absolute top-0 left-0 z-10 flex flex-col items-start gap-0.5 bg-background p-2">
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
        )}

        <div className="absolute right-3 bottom-2 z-10 flex items-center gap-3">
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

        {visibleWindows.map((file, index) => {
          const depth = stack.indexOf(file.id);
          if (depth === -1) return null;

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
      </section>
    </div>
  );
}
