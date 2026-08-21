import { Desktop } from "@/features/desktop/desktop";
import { LocalTime } from "@/features/desktop/local-time";
import { getHomeWindows } from "@/features/desktop/resolve";
import {
  getShellContext,
  toEntry,
  windowTextContent,
} from "@/features/desktop/shell";

export async function HomeScreen() {
  const [{ settings, corner, cornerContent }, files] = await Promise.all([
    getShellContext(),
    getHomeWindows(),
  ]);

  return (
    <main
      id="main"
      data-slot="home-desktop"
      className="h-svh bg-background px-1.5 pb-1.5"
    >
      <Desktop
        view="desktop"
        name={settings.name}
        navigation={settings.navigation}
        activeHref="/"
        status={<LocalTime />}
        files={files.map(toEntry)}
        corner={corner.map(toEntry)}
        content={{
          ...cornerContent,
          ...windowTextContent(files, settings.name),
        }}
      />
    </main>
  );
}
