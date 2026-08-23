"use client";

import { File, Folder, FolderOpen, Minus, Plus } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { ReactNode } from "react";
import { useEffect, useState } from "react";

import { Button } from "@/components/button";
import { FileTree, FileTreeFile } from "@/components/file-tree";
import { SanityImage } from "@/components/sanity-image";
import { InfiniteDesk } from "@/features/desktop/infinite-desk";
import { PieceModal } from "@/features/desktop/piece-modal";
import { WorksRail } from "@/features/desktop/works-rail";
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

const SCATTER_TILE = { width: 1100, height: 760 };
const SCATTER_WIDTH = 24;
const COPIES: [number, number][] = [
  [-1, -1],
  [0, -1],
  [1, -1],
  [-1, 0],
  [0, 0],
  [1, 0],
  [-1, 1],
  [0, 1],
  [1, 1],
];

export type ScatterItem = {
  id: string;
  label: string;
  image: { alt: string; asset: { _ref?: string } };
  width: number;
  meta?: string | null;
  description?: string | null;
};

export type SidebarEntry = {
  cover?: { alt: string; asset: { _ref?: string } } | null;
  itemCount?: number;
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
  cornerLinks: SiteLink[];
  content: Record<string, ReactNode>;
  files?: DesktopEntry[];
  sidebar?: SidebarEntry[];
  scatter?: ScatterItem[];
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
  cornerLinks,
  content,
  files = [],
  sidebar = [],
  scatter = [],
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
  const [openPiece, setOpenPiece] = useState<string | null>(null);
  const [spots, setSpots] = useState<{ x: number; y: number }[] | null>(null);

  const pieceCount = scatter.length;

  useEffect(() => {
    if (pieceCount === 0) return;

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSpots(
      Array.from({ length: pieceCount }, () => ({
        x: Math.random() * SCATTER_TILE.width,
        y: Math.random() * SCATTER_TILE.height,
      })),
    );
  }, [pieceCount]);

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
  const scattered = scatter.length > 0;
  const showDesk = view === "desktop" || scattered || !hasDocument;
  const floating = files;

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
            "col-span-2 col-start-1 row-start-2 min-w-40 flex-col overflow-hidden border border-paper/20 lg:col-start-1 lg:flex",
            hasDocument ? "hidden lg:flex" : "flex",
            sidebarExpanded ? "lg:col-span-12" : "lg:col-span-4",
          )}
        >
          <div className="flex h-8 items-center justify-between border-b border-paper/20 px-2 font-mono text-[11px] text-mist">
            <p>[{String(sidebar.length).padStart(2, "0")}]</p>

            <Button
              variant="control"
              size="none"
              onClick={() => setSidebarExpanded((previous) => !previous)}
              aria-label={`${sidebarExpanded ? "Collapse" : "Expand"} ${sidebarLabel}`}
              aria-pressed={sidebarExpanded}
              className="hidden size-3.5 hover:border-transparent hover:bg-mist hover:text-ink lg:flex lg:items-center lg:justify-center"
            >
              {sidebarExpanded ? (
                <Minus aria-hidden className="size-2.5" strokeWidth={2} />
              ) : (
                <Plus aria-hidden className="size-2.5" strokeWidth={2} />
              )}
            </Button>
          </div>

          {sidebar.length > 0 ? (
            <WorksRail entries={sidebar} activeId={document?.id} />
          ) : (
            <FileTree className="w-full gap-0">
              {sidebar.map((entry) => {
                const isOpen = entry.id === document?.id;
                const FolderIcon = isOpen ? FolderOpen : Folder;

                return (
                  <FileTreeFile
                    key={entry.id}
                    variant="folder"
                    active={isOpen}
                    render={<Link href={entry.href} />}
                  >
                    <FolderIcon aria-hidden className="size-3" />
                    {entry.label}
                  </FileTreeFile>
                );
              })}
            </FileTree>
          )}

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
          "relative row-start-2 overflow-hidden border border-paper/20",
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
        {showDesk && (
          <InfiniteDesk tile={scattered ? SCATTER_TILE : undefined}>
            {scattered && spots && (
              <ul
                className="absolute top-0 left-0"
                style={{
                  width: SCATTER_TILE.width,
                  height: SCATTER_TILE.height,
                }}
              >
                {COPIES.flatMap(([column, row]) =>
                  scatter.map((item, index) => {
                    const spot = spots[index];
                    const middle = column === 0 && row === 0;

                    return (
                      <li
                        key={`${column}.${row}.${item.id}`}
                        aria-hidden={middle ? undefined : true}
                        className="absolute -translate-x-1/2 -translate-y-1/2"
                        style={{
                          left: spot.x + column * SCATTER_TILE.width,
                          top: spot.y + row * SCATTER_TILE.height,
                        }}
                      >
                        <button
                          type="button"
                          tabIndex={middle ? undefined : -1}
                          onClick={() => setOpenPiece(item.id)}
                          style={{ width: `${SCATTER_WIDTH}rem` }}
                          className="block cursor-zoom-in focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                        >
                          <SanityImage
                            value={item.image}
                            sizes={`${SCATTER_WIDTH * 2}rem`}
                            className="w-full"
                          />
                          <span className="sr-only">{item.label}</span>
                        </button>
                      </li>
                    );
                  }),
                )}
              </ul>
            )}
          </InfiniteDesk>
        )}

        {view === "desktop" && files.length > 0 && (
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

        {openPiece && (
          <PieceModal
            piece={scatter.find((item) => item.id === openPiece)!}
            onClose={() => setOpenPiece(null)}
          />
        )}

        {showDesk && cornerLinks.length > 0 && (
          <FileTree className="absolute right-3 bottom-2 z-10 flex-row items-center gap-3">
            {cornerLinks.map((item) => (
              <FileTreeFile
                key={item.href}
                variant="link"
                nativeButton={false}
                render={<Link href={item.href} />}
              >
                {item.label}
              </FileTreeFile>
            ))}
          </FileTree>
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
