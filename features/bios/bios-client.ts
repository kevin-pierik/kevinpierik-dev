"use client";

import { useShortcut } from "@ui-sdk/react/shortcuts";
import { useRouter } from "next/navigation";
import { useSyncExternalStore } from "react";

import { isPlainKeyPress, rebootKeys } from "./reboot-keys";

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

  function reboot(event: KeyboardEvent) {
    if (isPlainKeyPress(event)) router.push("/");
  }

  useShortcut(rebootKeys[0], reboot, { description: "Reboot" });
  useShortcut(rebootKeys[1], reboot, { description: "Home" });
  useShortcut(rebootKeys[2], reboot, { description: "Home" });

  return null;
}
