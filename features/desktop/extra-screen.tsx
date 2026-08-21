import { Desktop } from "@/features/desktop/desktop";
import { DocumentWindow } from "@/features/desktop/document-window";
import { LocalTime } from "@/features/desktop/local-time";
import { getProject, getProjects } from "@/features/desktop/resolve";
import { getShellContext, toEntry } from "@/features/desktop/shell";
import { cn } from "@/features/style/utils";

type ExtraScreenProps = {
  slug?: string;
  fontClassName?: string;
};

export async function ExtraScreen({
  slug,
  fontClassName,
}: ExtraScreenProps) {
  const [{ settings, corner, cornerContent }, projects] = await Promise.all([
    getShellContext(),
    getProjects(),
  ]);

  const open = slug ? await getProject(slug) : null;

  return (
    <main
      id="main"
      data-slot="extra-desktop"
      className={cn("h-svh bg-background px-1.5 pb-1.5", fontClassName)}
    >
      <Desktop
        view="explorer"
        name={settings.name}
        navigation={settings.navigation}
        activeHref="/extra"
        status={<LocalTime />}
        footerNote={settings.footerNote}
        corner={corner.map(toEntry)}
        sidebar={projects.map((project) => ({
          id: project.id,
          label: project.label,
          href: `/extra/${project.id}`,
        }))}
        sidebarLabel="extra"
        indexHref="/extra"
        document={open ? toEntry(open) : undefined}
        content={{
          ...cornerContent,
          ...(open ? { [open.id]: <DocumentWindow window={open} /> } : {}),
        }}
      />
    </main>
  );
}
