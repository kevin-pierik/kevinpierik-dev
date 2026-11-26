"use client";

import { Toggle } from "@ui-sdk/react/toggle";
import { useSyncExternalStore } from "react";

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
      <svg
        aria-hidden="true"
        className="size-4.5 dark:hidden"
        fill="currentColor"
        viewBox="0 -960 960 960"
      >
        <path d="M480-144q-140 0-238-98t-98-238.03Q144-608 228-703t212.1-111.11Q452-816 461.5-810q9.5 6 14.58 15 5.07 9 5.5 21 .42 12-6.58 23-14 23-21.5 49.5T446-648q0 85 58.5 143.5T648-446q26.96 0 53.48-7.5Q728-461 751-475q11-7 22.5-6t20.03 6q9.47 5 15.47 14.5t4 21.5q-14 128-109.5 211.5T480-144Zm-1-72q82.92 0 148.88-46.01 65.97-46 96.12-119.99-20 5-39 8t-38 3q-114.27 0-194.64-80.48Q372-531.96 372-646.39q0-18.61 3-37.61t8-39q-74 30-120 95.93t-46 148.81Q217-369 293.73-292.5 370.46-216 479-216Zm-8-254Z" />
      </svg>
      <svg
        aria-hidden="true"
        className="hidden size-4.5 dark:block"
        fill="currentColor"
        viewBox="0 -960 960 960"
      >
        <path d="M565-395q35-35 35-85t-35-85q-35-35-85-35t-85 35q-35 35-35 85t35 85q35 35 85 35t85-35Zm-221 50.77q-56-56.22-56-136Q288-560 344.23-616q56.22-56 136-56Q560-672 616-615.77q56 56.22 56 136Q672-400 615.77-344q-56.22 56-136 56Q400-288 344-344.23ZM84-444q-15.3 0-25.65-10.29Q48-464.58 48-479.79t10.35-25.71Q68.7-516 84-516h96q15.3 0 25.65 10.29Q216-495.42 216-480.21t-10.35 25.71Q195.3-444 180-444H84Zm696 0q-15.3 0-25.65-10.29Q744-464.58 744-479.79t10.35-25.71Q764.7-516 780-516h96q15.3 0 25.65 10.29Q912-495.42 912-480.21t-10.35 25.71Q891.3-444 876-444h-96ZM454.5-754.35Q444-764.7 444-780v-96q0-15.3 10.29-25.65Q464.58-912 479.79-912t25.71 10.35Q516-891.3 516-876v96q0 15.3-10.29 25.65Q495.42-744 480.21-744t-25.71-10.35Zm0 696Q444-68.7 444-84v-96q0-15.3 10.29-25.65Q464.58-216 479.79-216t25.71 10.35Q516-195.3 516-180v96q0 15.3-10.29 25.65Q495.42-48 480.21-48T454.5-58.35ZM242-667l-50-51q-11-10-11-24.5t11-25.5q10.43-11 25.22-11Q232-779 242-768l51 50q11 10.94 11 25.53 0 14.59-11 25.53Q283-656 268-656t-26-11Zm476 475-51-50q-11-10.67-11-25.33Q656-282 667-293q10-11 25-11t26 11l50 51q11 10 11 24.5T768.48-192Q757-181 743-181t-25-11Zm-51.06-475Q656-677 656-692t11-26l51-50q11-11 25-10.5t25 10.54Q779-757 779-743t-11 25l-50 51q-10.94 11-25.53 11-14.59 0-25.53-11ZM192-192q-11-10.43-11-25.22Q181-232 192-242l50-51q10.67-10 25.33-10Q282-303 293-293q11 11 10.54 25.67-.46 14.66-10.54 25.33l-51 50q-10 11-24.5 11T192-192Zm288-288Z" />
      </svg>
    </Toggle>
  );
}
