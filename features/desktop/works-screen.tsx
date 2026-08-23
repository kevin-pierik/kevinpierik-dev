import { Desktop } from "@/features/desktop/desktop";
import { DocumentWindow } from "@/features/desktop/document-window";
import { LocalTime } from "@/features/desktop/local-time";
import { getProject, getProjects } from "@/features/desktop/resolve";
import { getShellContext, toEntry } from "@/features/desktop/shell";
import { cn } from "@/features/style/utils";

type WorksScreenProps = {
  slug?: string;
  fontClassName?: string;
};

export async function WorksScreen({ slug, fontClassName }: WorksScreenProps) {
  const [{ settings }, projects] = await Promise.all([
    getShellContext(),
    getProjects(),
  ]);

  const open = slug ? await getProject(slug) : null;
  const pieces = open?.pieces ?? [];
  const scattered = pieces.length > 0;
  const widths = [18, 13, 22, 15, 20];

  return (
    <main
      id="main"
      data-slot="works-desktop"
      className={cn("h-svh bg-background px-1.5 pb-1.5", fontClassName)}
    >
      <Desktop
        view={scattered ? "document" : "explorer"}
        name={settings.name}
        navigation={settings.navigation}
        activeHref="/works"
        status={<LocalTime />}
        footerNote={settings.footerNote}
        cornerLinks={settings.cornerLinks}
        sidebar={projects.map((project) => ({
          id: project.id,
          label: project.label,
          href: `/works/${project.id}`,
          cover: project.cover ?? null,
          itemCount: project.itemCount ?? 0,
        }))}
        sidebarLabel="works"
        indexHref="/works"
        scatter={pieces.map((piece, index) => ({
          id: piece.key,
          label: piece.title,
          image: piece.image,
          width: widths[index % widths.length],
          meta: piece.meta,
          description: piece.description,
        }))}
        document={open && !scattered ? toEntry(open) : undefined}
        content={
          scattered
            ? Object.fromEntries(
                pieces.map((piece) => [
                  piece.key,
                  <div key={piece.key} className="flex flex-col gap-2 p-3">
                    {piece.meta && (
                      <p className="font-mono text-[11px] text-mist">
                        {piece.meta}
                      </p>
                    )}
                    {piece.description && (
                      <p className="font-sans text-[13px]/[1.6] text-paper/85">
                        {piece.description}
                      </p>
                    )}
                  </div>,
                ]),
              )
            : open
              ? { [open.id]: <DocumentWindow window={open} /> }
              : {}
        }
      />
    </main>
  );
}
