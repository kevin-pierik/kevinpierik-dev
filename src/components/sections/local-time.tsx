"use client";

import { useSyncExternalStore } from "react";

const formatter = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Europe/Amsterdam",
  hour: "2-digit",
  minute: "2-digit",
});

function subscribe(onStoreChange: () => void) {
  const interval = setInterval(onStoreChange, 1000);
  return () => clearInterval(interval);
}

function getSnapshot(): string {
  return formatter.format(new Date());
}

function getServerSnapshot(): string {
  return "--:--";
}

export function LocalTime() {
  const time = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  return (
    <p className="font-mono text-xs tracking-[0.12em] text-foreground/70 uppercase">
      [NL] <time suppressHydrationWarning>{time}</time>
    </p>
  );
}
