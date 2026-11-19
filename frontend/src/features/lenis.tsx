"use client";

import { ReactLenis } from "lenis/react";

export function Lenis() {
  return (
    <ReactLenis
      options={{ anchors: true, autoRaf: true, respectReducedMotion: true }}
      root
    />
  );
}
