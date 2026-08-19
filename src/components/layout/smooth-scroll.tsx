"use client";

import { useEffect } from "react";

export function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let lenis: { destroy: () => void } | undefined;

    void import("lenis").then(({ default: Lenis }) => {
      lenis = new Lenis({ anchors: true, autoRaf: true });
    });

    return () => lenis?.destroy();
  }, []);

  return null;
}
