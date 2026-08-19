import { canvasArt, canvasColumns, canvasRows } from "@/content/canvas-art";

const MONO_ADVANCE = 0.6;
const LINE_HEIGHT = 1.05;
const WIDTH_SHARE = 0.9;
const HEIGHT_SHARE = 0.5;

const widthDivisor = Math.round((canvasColumns * MONO_ADVANCE) / WIDTH_SHARE);
const heightDivisor = Math.round((canvasRows * LINE_HEIGHT) / HEIGHT_SHARE);

export function CanvasBackdrop() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden select-none"
    >
      <pre
        className="absolute top-[42%] left-1/2 -translate-x-1/2 -translate-y-1/2 font-mono text-mist/45"
        style={{
          fontSize: `min(calc(100vw / ${widthDivisor}), calc(100svh / ${heightDivisor}))`,
          lineHeight: LINE_HEIGHT,
        }}
      >
        {canvasArt}
      </pre>
    </div>
  );
}
