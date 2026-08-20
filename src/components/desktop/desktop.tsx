"use client";

import { File, Folder, FolderOpen, Minus, Plus } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { ReactNode } from "react";
import { useState } from "react";

import { InfiniteDesk } from "@/components/desktop/infinite-desk";
import type { WindowOffset } from "@/components/desktop/window-frame";
import { WindowFrame } from "@/components/desktop/window-frame";
import { Button } from "@/components/ui/button";
import { FileTree, FileTreeFile } from "@/components/ui/file-tree";
import { desktopWindows } from "@/content/desktop";
import { cn } from "@/lib/utils";

const CASCADE = 22;

type DesktopMode = "home" | "works";

type DesktopProps = {
  mode: DesktopMode;
  name: string;
  status: ReactNode;
  content: Record<string, ReactNode>;
  activeProjectId?: string;
};

const navigation = [
  { mode: "home", href: "/", label: "Home" },
  { mode: "works", href: "/works", label: "Extra" },
] as const;

export function Desktop({
  mode,
  name,
  status,
  content,
  activeProjectId,
}: DesktopProps) {
  const router = useRouter();
  const projects = desktopWindows.filter((item) => item.placement === "project");
  const [stack, setStack] = useState<string[]>(mode === "home" ? ["about"] : []);
  const [offsets, setOffsets] = useState<Record<string, WindowOffset>>({});
  const [worksExpanded, setWorksExpanded] = useState(false);
  const [documentExpanded, setDocumentExpanded] = useState(false);
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

  const files = desktopWindows.filter((item) => item.placement === "home");
  const corner = desktopWindows.filter((item) => item.placement === "corner");
  const hasOpenProject = projects.some(
    (project) => project.id === activeProjectId,
  );
  const visibleWindows = desktopWindows.filter(
    (item) =>
      item.placement === "corner" ||
      (mode === "home" && item.placement === "home") ||
      (mode === "works" &&
        item.placement === "project" &&
        item.id === activeProjectId),
  );

  return (
    <div className="relative grid h-full grid-cols-[auto_1fr] grid-rows-[2.25rem_minmax(0,1fr)] gap-x-3 lg:grid-cols-12 lg:gap-x-4">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-9 z-40 border-b border-paper/15"
      />
      <header
        className="col-span-2 col-start-1 row-start-1 flex items-center justify-between gap-4 px-2 lg:col-span-4"
      >
        <h1 className="font-mono text-xs tracking-[0.08em]">{name}</h1>
        <Button
          variant="desk"
          size="none"
          onClick={() => setMenuOpen((previous) => !previous)}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          className="text-xs text-paper lg:hidden"
        >
          {menuOpen ? "Close Menu" : "Open Menu"}
        </Button>
      </header>

      <nav
        aria-label="Main navigation"
        className="col-start-5 row-start-1 hidden min-w-40 items-center justify-between gap-4 px-2 lg:col-span-8 lg:flex"
      >
        <div className="flex items-center gap-4">
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
        </div>

        {status}
      </nav>

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

      {mode === "works" && !documentExpanded && (
        <aside
          className={cn(
            "col-span-2 col-start-1 row-start-2 min-w-40 flex-col overflow-hidden border-x border-b border-paper/20 lg:col-start-1 lg:flex",
            hasOpenProject ? "hidden lg:flex" : "flex",
            worksExpanded ? "lg:col-span-12" : "lg:col-span-4",
          )}
        >
          <div className="flex h-7 items-center justify-between border-b border-paper/20 px-2 font-mono text-[11px] text-mist">
            <p>[{String(projects.length).padStart(2, "0")}]</p>

            <Button
              variant="control"
              size="none"
              onClick={() => setWorksExpanded((previous) => !previous)}
              aria-label={worksExpanded ? "Collapse extra" : "Expand extra"}
              aria-pressed={worksExpanded}
              className="hidden size-3.5 hover:border-transparent hover:bg-mist hover:text-ink lg:flex lg:items-center lg:justify-center"
            >
              {worksExpanded ? (
                <Minus aria-hidden className="size-2.5" strokeWidth={2} />
              ) : (
                <Plus aria-hidden className="size-2.5" strokeWidth={2} />
              )}
            </Button>
          </div>

          <FileTree className="w-full gap-0">
            {projects.map((project) => {
              const isOpen = project.id === activeProjectId;
              const FolderIcon = isOpen ? FolderOpen : Folder;

              return (
                <FileTreeFile
                  key={project.id}
                  variant="folder"
                  active={isOpen}
                  nativeButton={false}
                  render={<Link href={`/works/${project.id}`} />}
                >
                  <FolderIcon aria-hidden className="size-3" />
                  {project.label}
                </FileTreeFile>
              );
            })}
          </FileTree>

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
            : hasOpenProject
              ? documentExpanded
                ? "col-span-2 col-start-1 lg:col-span-12 lg:col-start-1"
                : "col-span-2 col-start-1 lg:col-span-8 lg:col-start-5"
              : "hidden lg:col-span-8 lg:col-start-5 lg:block",
          mode === "works" && worksExpanded && "lg:hidden",
        )}
      >
        {(mode === "home" || !hasOpenProject) && <InfiniteDesk />}

        {mode === "home" && (
          <FileTree className="absolute top-0 left-0 z-10 bg-background p-2">
            {files.map((file) => {
              const isOpen = stack.includes(file.id);

              return (
                <FileTreeFile
                  key={file.id}
                  active={isOpen}
                  onClick={() => toggle(file.id)}
                >
                  <File
                    aria-hidden
                    className={cn("size-3", isOpen && "fill-current")}
                  />
                  {file.label}
                </FileTreeFile>
              );
            })}
          </FileTree>
        )}

        {(mode === "home" || !hasOpenProject) && (
          <FileTree className="absolute right-3 bottom-2 z-10 flex-row items-center gap-3">
            {corner.map((item) => (
              <FileTreeFile
                key={item.id}
                variant="link"
                active={stack.includes(item.id)}
                onClick={() => toggle(item.id)}
              >
                {item.label}
              </FileTreeFile>
            ))}
          </FileTree>
        )}

        {visibleWindows.map((file, index) => {
          const depth =
            file.placement === "project" ? stack.length : stack.indexOf(file.id);
          if (depth === -1) return null;

          return (
            <WindowFrame
              key={file.id}
              title={file.title}
              variant={file.placement === "project" ? "document" : "default"}
              offset={offsets[file.id] ?? initialOffset(index)}
              depth={depth}
              onMove={move(file.id, index)}
              onFocus={() => focus(file.id)}
              expanded={file.placement === "project" && documentExpanded}
              onExpand={
                file.placement === "project"
                  ? () => setDocumentExpanded((previous) => !previous)
                  : undefined
              }
              onClose={() =>
                file.placement === "project"
                  ? router.push("/works")
                  : toggle(file.id)
              }
            >
              {content[file.id]}
            </WindowFrame>
          );
        })}
      </section>
    </div>
  );
}
