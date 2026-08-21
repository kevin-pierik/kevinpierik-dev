"use client";

import { File, Folder, FolderOpen, Minus, Plus } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { ReactNode } from "react";
import { useState } from "react";

import { InfiniteDesk } from "@/features/desktop/infinite-desk";
import type { WindowOffset } from "@/features/desktop/window-frame";
import { WindowFrame } from "@/features/desktop/window-frame";
import { SiteHeader } from "@/features/site/site-header";
import type { SiteLink } from "@/features/site/types";
import { cn } from "@/features/style/utils";

const CASCADE = 22;

export type DesktopView = "desktop" | "explorer" | "document";

export type DesktopEntry = {
  id: string;
  label: string;
  title: string;
};

export type SidebarEntry = {
  id: string;
  label: string;
  href: string;
};

type DesktopProps = {
  view: DesktopView;
  name: string;
  navigation: SiteLink[];
  activeHref: string;
  status: ReactNode;
  corner: DesktopEntry[];
  content: Record<string, ReactNode>;
  files?: DesktopEntry[];
  sidebar?: SidebarEntry[];
  sidebarLabel?: string;
  indexHref?: string;
  footerNote?: string | null;
  document?: DesktopEntry;
};

export function Desktop({
  view,
  name,
  navigation,
  activeHref,
  status,
  corner,
  content,
  files = [],
  sidebar = [],
  sidebarLabel = "folders",
  indexHref = "/",
  footerNote,
  document,
}: DesktopProps) {
  const router = useRouter();
  const [stack, setStack] = useState<string[]>(
    view === "desktop" ? files.slice(0, 1).map((file) => file.id) : [],
  );
  const [offsets, setOffsets] = useState<Record<string, WindowOffset>>({});
  const [sidebarExpanded, setSidebarExpanded] = useState(false);
  const [documentExpanded, setDocumentExpanded] = useState(false);

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

  function initialOffset(index: number): WindowOffset {
    return { x: index * CASCADE, y: index * CASCADE };
  }

  function move(id: string, index: number) {
    return (next: (previous: WindowOffset) => WindowOffset) =>
      setOffsets((previous) => ({
        ...previous,
        [id]: next(previous[id] ?? initialOffset(index)),
      }));
  }

  const hasDocument = Boolean(document);
  const isFullWidth = view === "desktop" || view === "document";
  const showDesk = view === "desktop" || !hasDocument;
  const floating = [...files, ...corner];

  return (
    <div className="relative grid h-full grid-cols-[auto_1fr] grid-rows-[2.25rem_minmax(0,1fr)] gap-x-3 lg:grid-cols-12 lg:gap-x-4">
      <SiteHeader
        name={name}
        nameAs={view === "desktop" ? "h1" : "p"}
        navigation={navigation}
        activeHref={activeHref}
        status={status}
      />

      {view === "explorer" && !documentExpanded && (
        <aside
          className={cn(
            "col-span-2 col-start-1 row-start-2 min-w-40 flex-col overflow-hidden border-x border-b border-paper/20 lg:col-start-1 lg:flex",
            hasDocument ? "hidden lg:flex" : "flex",
            sidebarExpanded ? "lg:col-span-12" : "lg:col-span-4",
          )}
        >
          <div className="flex h-7 items-center justify-between border-b border-paper/20 px-2 font-mono text-[11px] text-mist">
            <p>[{String(sidebar.length).padStart(2, "0")}]</p>

            <button
              type="button"
              onClick={() => setSidebarExpanded((previous) => !previous)}
              aria-label={`${sidebarExpanded ? "Collapse" : "Expand"} ${sidebarLabel}`}
              aria-pressed={sidebarExpanded}
              className="relative hidden size-3.5 shrink-0 cursor-pointer items-center justify-center rounded-full bg-paper text-ink before:absolute before:-inset-2.5 hover:bg-mist focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring lg:flex"
            >
              {sidebarExpanded ? (
                <Minus aria-hidden className="size-2.5" strokeWidth={2} />
              ) : (
                <Plus aria-hidden className="size-2.5" strokeWidth={2} />
              )}
            </button>
          </div>

          <ul>
            {sidebar.map((entry) => {
              const isOpen = entry.id === document?.id;
              const FolderIcon = isOpen ? FolderOpen : Folder;

              return (
                <li key={entry.id} className="border-b border-paper/20">
                  <Link
                    href={entry.href}
                    aria-current={isOpen ? "page" : undefined}
                    className={cn(
                      "flex min-h-7 w-full items-center gap-1.5 px-2 font-mono text-[11px] transition-colors hover:bg-paper/8 hover:text-paper focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-ring",
                      isOpen ? "bg-paper/10 text-paper" : "text-mist",
                    )}
                  >
                    <FolderIcon aria-hidden className="size-3" />
                    {entry.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="mt-auto flex flex-col gap-1 p-2 font-mono text-[11px] text-mist">
            {footerNote && <p>{footerNote}</p>}
            <p>
              &copy; {new Date().getFullYear()} {name}.
            </p>
          </div>
        </aside>
      )}

      <section
        className={cn(
          "relative row-start-2 overflow-hidden border-x border-b border-paper/20",
          isFullWidth
            ? "col-span-2 col-start-1 lg:col-span-12"
            : hasDocument
              ? documentExpanded
                ? "col-span-2 col-start-1 lg:col-span-12 lg:col-start-1"
                : "col-span-2 col-start-1 lg:col-span-8 lg:col-start-5"
              : "hidden lg:col-span-8 lg:col-start-5 lg:block",
          view === "explorer" && sidebarExpanded && "lg:hidden",
        )}
      >
        {showDesk && <InfiniteDesk />}

        {view === "desktop" && files.length > 0 && (
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

        {showDesk && corner.length > 0 && (
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
        )}

        {floating.map((entry, index) => {
          const depth = stack.indexOf(entry.id);
          if (depth === -1) return null;

          return (
            <WindowFrame
              key={entry.id}
              title={entry.title}
              offset={offsets[entry.id] ?? initialOffset(index)}
              depth={depth}
              onMove={move(entry.id, index)}
              onFocus={() => focus(entry.id)}
              onClose={() => toggle(entry.id)}
            >
              {content[entry.id]}
            </WindowFrame>
          );
        })}

        {document && (
          <WindowFrame
            key={document.id}
            title={document.title}
            titleAs="h1"
            variant="document"
            offset={offsets[document.id] ?? initialOffset(0)}
            depth={stack.length}
            onMove={move(document.id, 0)}
            onFocus={() => focus(document.id)}
            expanded={documentExpanded}
            onExpand={
              view === "explorer"
                ? () => setDocumentExpanded((previous) => !previous)
                : undefined
            }
            onClose={() => router.push(indexHref)}
          >
            {content[document.id]}
          </WindowFrame>
        )}
      </section>
    </div>
  );
}
