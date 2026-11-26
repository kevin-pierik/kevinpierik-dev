"use client";

import { Toggle, ToggleIcon } from "@ui-sdk/react/toggle";
import { useSyncExternalStore } from "react";
import { Moon, Sun } from "lucide-react";

import { focus } from "@/components/link";

const darkQuery = "(prefers-color-scheme: dark)";

function subscribe(onChange: () => void) {
  const media = matchMedia(darkQuery);
  media.addEventListener("change", onChange);
  window.addEventListener("themechange", onChange);
  return () => {
    media.removeEventListener("change", onChange);
    window.removeEventListener("themechange", onChange);
  };
}

function isDark() {
  const theme = document.documentElement.dataset.theme;
  return theme ? theme === "dark" : matchMedia(darkQuery).matches;
}

function setDark(dark: boolean) {
  const theme = dark ? "dark" : "light";
  document.documentElement.dataset.theme = theme;
  try {
    localStorage.setItem("theme", theme);
  } catch {}
  window.dispatchEvent(new Event("themechange"));
}

export function ThemeToggle({ className }: { className?: string }) {
  const dark = useSyncExternalStore(subscribe, isDark, () => false);

  return (
    <Toggle
      aria-label="Dark mode"
      className={`inline-flex size-8 items-center justify-center rounded-full text-muted transition-colors hover:text-foreground pointer-coarse:size-11 ${focus} ${className ?? ""}`}
      onPressedChange={setDark}
      pressed={dark}
    >
      <ToggleIcon className="contents">
        <Moon className="size-4 dark:hidden" />
        <Sun className="hidden size-4 dark:block" />
      </ToggleIcon>
    </Toggle>
  );
}
