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

  return (
    <main
      id="main"
      data-slot="works-desktop"
      className={cn("h-svh bg-background px-1.5 pb-1.5", fontClassName)}
    >
      <Desktop
        view="explorer"
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
        }))}
        sidebarLabel="works"
        indexHref="/works"
        document={open ? toEntry(open) : undefined}
        content={{
          ...(open ? { [open.id]: <DocumentWindow window={open} /> } : {}),
        }}
      />
    </main>
  );
}
