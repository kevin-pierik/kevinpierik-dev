"use client";

import type { ReactNode } from "react";
import { useEffect, useRef } from "react";

type InfiniteDeskProps = {
  children?: ReactNode;
};

type Motion = {
  x: number;
  y: number;
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

export function InfiniteDesk({ children }: InfiniteDeskProps) {
  const viewport = useRef<HTMLDivElement>(null);
  const surface = useRef<HTMLDivElement>(null);
  const world = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = viewport.current;
    const background = surface.current;
    const content = world.current;
    if (!element || !background || !content) return;
    const viewportElement = element;
    const backgroundElement = background;
    const worldElement = content;

    const motion: Motion = {
      x: 0,
      y: 0,
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

    function render() {
      const gridX = ((motion.x % GRID_SIZE) + GRID_SIZE) % GRID_SIZE;
      const gridY = ((motion.y % GRID_SIZE) + GRID_SIZE) % GRID_SIZE;
      backgroundElement.style.backgroundPosition = `${gridX}px ${gridY}px`;
      worldElement.style.transform = `translate3d(${motion.x}px, ${motion.y}px, 0)`;
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
      render();

      const moving =
        motion.dragging ||
        Math.abs(motion.targetX - motion.x) > 0.05 ||
        Math.abs(motion.targetY - motion.y) > 0.05 ||
        Math.abs(motion.velocityX) > 0.5 ||
        Math.abs(motion.velocityY) > 0.5;
      frameId = moving ? requestAnimationFrame(frame) : 0;
    }

    function start() {
      if (reducedMotion) {
        motion.x = motion.targetX;
        motion.y = motion.targetY;
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
        if (
          !(target instanceof Element) ||
          target.closest("a, button")
        ) {
          return;
        }

        event.preventDefault();
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
        Drag or scroll to pan the desk. Use the arrow keys when this area is focused.
      </p>
      <div
        ref={surface}
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-70"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgb(255 255 255 / 0.035) 1px, transparent 1px), linear-gradient(to bottom, rgb(255 255 255 / 0.035) 1px, transparent 1px)",
          backgroundSize: `${GRID_SIZE}px ${GRID_SIZE}px`,
        }}
      />
      <div ref={world} className="absolute inset-0 will-change-transform">
        {children}
      </div>
    </div>
  );
}
