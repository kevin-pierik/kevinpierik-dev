import { Desktop } from "@/features/desktop/desktop";
import { DocumentWindow } from "@/features/desktop/document-window";
import { LocalTime } from "@/features/desktop/local-time";
import { getShellContext, toEntry } from "@/features/desktop/shell";
import type { WindowDocument } from "@/features/desktop/types";
import { cn } from "@/features/style/utils";

type StandaloneScreenProps = {
  page: WindowDocument;
  fontClassName?: string;
};

export async function StandaloneScreen({
  page,
  fontClassName,
}: StandaloneScreenProps) {
  const { settings } = await getShellContext();

  return (
    <main
      id="main"
      data-slot="page-desktop"
      className={cn("h-svh bg-background px-1.5 pb-1.5", fontClassName)}
    >
      <Desktop
        view="document"
        name={settings.name}
        navigation={settings.navigation}
        activeHref={`/${page.id}`}
        status={<LocalTime />}
        cornerLinks={settings.cornerLinks}
        indexHref="/"
        document={toEntry(page)}
        content={{
          [page.id]: <DocumentWindow window={page} />,
        }}
      />
    </main>
  );
}
