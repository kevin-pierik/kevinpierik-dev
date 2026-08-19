"use client";

import { useState } from "react";

const shapes = [0, 25, 50, 75, 100];

export function PixelMark() {
  const [step, setStep] = useState(2);

  return (
    <button
      type="button"
      onClick={() => setStep((current) => (current + 1) % shapes.length)}
      className="group flex cursor-pointer flex-col items-start gap-3 rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring sm:items-end"
    >
      <span className="font-mono text-xs tracking-[0.12em] text-muted-foreground uppercase transition-colors group-hover:text-foreground">
        Click
      </span>
      <span
        aria-hidden
        style={{ fontVariationSettings: `"ELSH" ${shapes[step]}` }}
        className="font-pixel text-[clamp(4.5rem,16vw,11rem)]/none tracking-[0.05em] transition-all duration-300"
      >
        KP
      </span>
      <span className="sr-only">Change the pixel shape</span>
    </button>
  );
}
