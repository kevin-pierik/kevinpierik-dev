import type { ReactNode } from "react";

import { getShell } from "@/features/desktop/resolve";
import type { DesktopItem, WindowDocument } from "@/features/desktop/types";
import { WindowText } from "@/features/rich-text/window-text";
import type { Settings } from "@/features/site/types";

export const toEntry = ({ id, label, title }: DesktopItem) => ({
  id,
  label,
  title,
});

export function signature(name: string) {
  return `© ${new Date().getFullYear()} ${name}.`;
}

export function windowTextContent(
  windows: WindowDocument[],
  name: string,
): Record<string, ReactNode> {
  return Object.fromEntries(
    windows.map((window) => [
      window.id,
      <WindowText
        key={window.id}
        value={window.body}
        signature={signature(name)}
      />,
    ]),
  );
}

export async function getShellContext(): Promise<{ settings: Settings }> {
  return { settings: await getShell() };
}
