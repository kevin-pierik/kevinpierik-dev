"use client";

import { useRouter } from "next/navigation";
import { useEffect, useSyncExternalStore } from "react";

const rebootKeys = new Set(["Enter", "Escape", "F1"]);

const subscribeToNothing = () => () => {};

export function RequestedRoute() {
  return useSyncExternalStore(
    subscribeToNothing,
    () => window.location.pathname,
    () => "Unknown",
  );
}

export function RebootShortcut() {
  const router = useRouter();

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (!rebootKeys.has(event.key) || event.repeat) return;
      if (event.metaKey || event.ctrlKey || event.altKey || event.shiftKey) {
        return;
      }
      event.preventDefault();
      router.push("/");
    }

    window.addEventListener("keydown", onKeyDown);

    return () => window.removeEventListener("keydown", onKeyDown);
  }, [router]);

  return null;
}
