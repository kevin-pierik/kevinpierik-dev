"use client";

import type { ReactNode } from "react";
import { useEffect, useRef } from "react";

type InfiniteDeskProps = {
  children?: ReactNode;
};

type Motion = {
  x: number;
  y: number;
  scale: number;
  targetScale: number;
  targetX: number;
  targetY: number;
  velocityX: number;
  velocityY: number;
  pointerId: number;
  pointerX: number;
  pointerY: number;
  pointerTime: number;
  dragging: boolean;
};

const GRID_SIZE = 32;
const MIN_SCALE = 0.71;
const MAX_SCALE = 2.86;
const ZOOM_STEP = 1.12;

const clampScale = (value: number) =>
  Math.min(MAX_SCALE, Math.max(MIN_SCALE, value));

export function InfiniteDesk({ children }: InfiniteDeskProps) {
  const viewport = useRef<HTMLDivElement>(null);
  const surface = useRef<HTMLDivElement>(null);
  const world = useRef<HTMLDivElement>(null);
  const readout = useRef<HTMLOutputElement>(null);

  useEffect(() => {
    const element = viewport.current;
    const background = surface.current;
    const content = world.current;
    const label = readout.current;
    if (!element || !background || !content || !label) return;
    const viewportElement = element;
    const backgroundElement = background;
    const worldElement = content;
    const zoomLabel = label;

    const motion: Motion = {
      x: 0,
      y: 0,
      scale: 1,
      targetScale: 1,
      targetX: 0,
      targetY: 0,
      velocityX: 0,
      velocityY: 0,
      pointerId: -1,
      pointerX: 0,
      pointerY: 0,
      pointerTime: 0,
      dragging: false,
    };
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    let reducedMotion = media.matches;
    let frameId = 0;
    let previousFrame = performance.now();
    let hideTimer = 0;

    function revealZoom() {
      zoomLabel.style.opacity = "1";
      window.clearTimeout(hideTimer);
      hideTimer = window.setTimeout(() => {
        zoomLabel.style.opacity = "0";
      }, 1200);
    }

    function render() {
      const cell = GRID_SIZE * motion.scale;
      const gridX = ((motion.x % cell) + cell) % cell;
      const gridY = ((motion.y % cell) + cell) % cell;
      backgroundElement.style.backgroundSize = `${cell}px ${cell}px`;
      backgroundElement.style.backgroundPosition = `${gridX}px ${gridY}px`;
      worldElement.style.transform = `translate3d(${motion.x}px, ${motion.y}px, 0) scale(${motion.scale})`;
      zoomLabel.value = `${Math.round(motion.scale * 100)}%`;
    }

    function zoomAt(factor: number, originX: number, originY: number) {
      const next = clampScale(motion.targetScale * factor);
      if (next === motion.targetScale) return;

      const ratio = next / motion.targetScale;
      motion.targetX = originX - (originX - motion.targetX) * ratio;
      motion.targetY = originY - (originY - motion.targetY) * ratio;
      motion.targetScale = next;
      motion.velocityX = 0;
      motion.velocityY = 0;
      revealZoom();
    }

    function frame(now: number) {
      const delta = Math.min(0.032, (now - previousFrame) / 1000);
      previousFrame = now;

      if (!motion.dragging) {
        motion.targetX += motion.velocityX * delta;
        motion.targetY += motion.velocityY * delta;
        const friction = Math.exp(-7.5 * delta);
        motion.velocityX *= friction;
        motion.velocityY *= friction;
      }

      const follow = 1 - Math.exp(-24 * delta);
      motion.x += (motion.targetX - motion.x) * follow;
      motion.y += (motion.targetY - motion.y) * follow;
      motion.scale += (motion.targetScale - motion.scale) * follow;
      render();

      const moving =
        motion.dragging ||
        Math.abs(motion.targetX - motion.x) > 0.05 ||
        Math.abs(motion.targetY - motion.y) > 0.05 ||
        Math.abs(motion.targetScale - motion.scale) > 0.0005 ||
        Math.abs(motion.velocityX) > 0.5 ||
        Math.abs(motion.velocityY) > 0.5;
      frameId = moving ? requestAnimationFrame(frame) : 0;
    }

    function start() {
      if (reducedMotion) {
        motion.x = motion.targetX;
        motion.y = motion.targetY;
        motion.scale = motion.targetScale;
        motion.velocityX = 0;
        motion.velocityY = 0;
        render();
        return;
      }
      if (frameId) return;
      previousFrame = performance.now();
      frameId = requestAnimationFrame(frame);
    }

    const controller = new AbortController();
    const { signal } = controller;

    viewportElement.addEventListener(
      "pointerdown",
      (event) => {
        const target = event.target;
        if (
          event.button !== 0 ||
          !(target instanceof Element) ||
          target.closest("a, button")
        ) {
          return;
        }

        event.preventDefault();
        viewportElement.focus({ preventScroll: true });
        viewportElement.setPointerCapture(event.pointerId);
        motion.pointerId = event.pointerId;
        motion.pointerX = event.clientX;
        motion.pointerY = event.clientY;
        motion.pointerTime = performance.now();
        motion.velocityX = 0;
        motion.velocityY = 0;
        motion.dragging = true;
        start();
      },
      { signal },
    );
    viewportElement.addEventListener(
      "pointermove",
      (event) => {
        if (event.pointerId !== motion.pointerId || !motion.dragging) return;

        const now = performance.now();
        const elapsed = Math.max(8, now - motion.pointerTime) / 1000;
        const deltaX = event.clientX - motion.pointerX;
        const deltaY = event.clientY - motion.pointerY;
        motion.pointerX = event.clientX;
        motion.pointerY = event.clientY;
        motion.pointerTime = now;
        motion.targetX += deltaX;
        motion.targetY += deltaY;
        motion.velocityX = Math.max(-1200, Math.min(1200, deltaX / elapsed));
        motion.velocityY = Math.max(-1200, Math.min(1200, deltaY / elapsed));
        start();
      },
      { signal },
    );

    function release(event: PointerEvent) {
      if (event.pointerId !== motion.pointerId) return;
      if (viewportElement.hasPointerCapture(event.pointerId)) {
        viewportElement.releasePointerCapture(event.pointerId);
      }
      motion.pointerId = -1;
      motion.dragging = false;
      start();
    }

    viewportElement.addEventListener("pointerup", release, { signal });
    viewportElement.addEventListener("pointercancel", release, { signal });
    viewportElement.addEventListener(
      "wheel",
      (event) => {
        const target = event.target;
        if (!(target instanceof Element) || target.closest("a, button")) {
          return;
        }

        event.preventDefault();

        if (event.ctrlKey || event.metaKey) {
          const bounds = viewportElement.getBoundingClientRect();
          zoomAt(
            Math.exp(-event.deltaY / 220),
            event.clientX - bounds.left,
            event.clientY - bounds.top,
          );
          start();
          return;
        }

        motion.targetX -= event.deltaX;
        motion.targetY -= event.deltaY;
        motion.velocityX = 0;
        motion.velocityY = 0;
        start();
      },
      { passive: false, signal },
    );
    viewportElement.addEventListener(
      "keydown",
      (event) => {
        const movement: Record<string, [number, number]> = {
          ArrowUp: [0, 64],
          ArrowDown: [0, -64],
          ArrowLeft: [64, 0],
          ArrowRight: [-64, 0],
        };
        if (event.key === "+" || event.key === "=" || event.key === "-") {
          event.preventDefault();
          const bounds = viewportElement.getBoundingClientRect();
          zoomAt(
            event.key === "-" ? 1 / ZOOM_STEP : ZOOM_STEP,
            bounds.width / 2,
            bounds.height / 2,
          );
          start();
          return;
        }

        if (event.key === "0") {
          event.preventDefault();
          const bounds = viewportElement.getBoundingClientRect();
          zoomAt(1 / motion.targetScale, bounds.width / 2, bounds.height / 2);
          start();
          return;
        }

        const delta = movement[event.key];
        if (!delta) return;

        event.preventDefault();
        motion.targetX += delta[0];
        motion.targetY += delta[1];
        motion.velocityX = 0;
        motion.velocityY = 0;
        start();
      },
      { signal },
    );
    media.addEventListener(
      "change",
      (event) => {
        reducedMotion = event.matches;
        start();
      },
      { signal },
    );

    render();

    return () => {
      controller.abort();
      window.clearTimeout(hideTimer);
      if (frameId) cancelAnimationFrame(frameId);
    };
  }, []);

  return (
    <div
      ref={viewport}
      role="region"
      aria-label="Infinite desk"
      tabIndex={0}
      className="absolute inset-0 isolate z-0 size-full min-h-0 cursor-grab touch-none select-none overflow-clip overscroll-none outline-none active:cursor-grabbing focus-visible:ring-0"
    >
      <p className="sr-only">
        Drag or scroll to pan the desk. Use the arrow keys to pan, plus and
        minus to zoom, and zero to reset, when this area is focused.
      </p>
      <div
        ref={surface}
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-70"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgb(255 255 255 / 0.035) 1px, transparent 1px), linear-gradient(to bottom, rgb(255 255 255 / 0.035) 1px, transparent 1px)",
        }}
      />
      <div
        ref={world}
        className="absolute inset-0 origin-top-left will-change-transform"
      >
        {children}
      </div>

      <output
        ref={readout}
        aria-label="Zoom level"
        className="pointer-events-none absolute bottom-3 left-3 z-10 font-mono text-[11px] text-mist/50 tabular-nums opacity-0 transition-opacity duration-300 select-none"
      />
    </div>
  );
}
