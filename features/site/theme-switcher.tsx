"use client";

import {
  SegmentedControl,
  SegmentedControlIndicator,
  SegmentedControlItem,
} from "@ui-sdk/react/segmented-control";
import { useLayoutEffect, useSyncExternalStore, type ReactNode } from "react";

import type { Dictionary } from "@/features/i18n";
import {
  parseTheme,
  type Theme,
  themeColors,
  themes,
  themeStorageKey,
} from "@/features/site/theme";

const listeners = new Set<() => void>();

function subscribe(listener: () => void) {
  listeners.add(listener);
  window.addEventListener("storage", listener);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", listener);
  };
}

function readTheme(): Theme {
  try {
    return parseTheme(localStorage.getItem(themeStorageKey));
  } catch {
    return "system";
  }
}

function applyTheme(theme: Theme) {
  const root = document.documentElement;
  root.classList.toggle("light", theme === "light");
  root.classList.toggle("dark", theme === "dark");
  let meta = document.head.querySelector<HTMLMetaElement>(
    'meta[name="theme-color"][data-theme]',
  );
  if (theme === "system") {
    meta?.remove();
    return;
  }
  if (!meta) {
    meta = document.createElement("meta");
    meta.name = "theme-color";
    meta.setAttribute("data-theme", "");
    document.head.prepend(meta);
  }
  meta.content = themeColors[theme];
}

function storeTheme(theme: Theme) {
  try {
    if (theme === "system") localStorage.removeItem(themeStorageKey);
    else localStorage.setItem(themeStorageKey, theme);
  } catch {}
  for (const listener of listeners) listener();
}

const icons: Record<Theme, ReactNode> = {
  system: (
    <>
      <rect height="14" rx="2" ry="2" width="20" x="2" y="3" />
      <path d="M8 21h8" />
      <path d="M12 17v4" />
    </>
  ),
  light: (
    <>
      <circle cx="12" cy="12" r="5" />
      <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
    </>
  ),
  dark: <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />,
};

export function ThemeSwitcher({ labels }: { labels: Dictionary["theme"] }) {
  const theme = useSyncExternalStore<Theme>(
    subscribe,
    readTheme,
    () => "system",
  );

  useLayoutEffect(() => {
    applyTheme(theme);
  }, [theme]);

  return (
    <SegmentedControl
      aria-label={labels.label}
      className="relative isolate inline-flex"
      onValueChange={(value) => storeTheme(parseTheme(value))}
      value={theme}
    >
      <SegmentedControlIndicator className="absolute top-(--segmented-control-indicator-top) left-(--segmented-control-indicator-left) -z-10 h-(--segmented-control-indicator-height) w-(--segmented-control-indicator-width) border border-foreground transition-[left,top,width,height] duration-200" />
      {themes.map((value) => (
        <SegmentedControlItem
          aria-label={labels[value]}
          className="grid size-8 place-items-center transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring data-checked:text-foreground"
          key={value}
          title={labels[value]}
          value={value}
        >
          <svg
            aria-hidden="true"
            className="size-4"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            viewBox="0 0 24 24"
          >
            {icons[value]}
          </svg>
        </SegmentedControlItem>
      ))}
    </SegmentedControl>
  );
}
