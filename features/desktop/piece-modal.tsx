"use client";

import { X } from "lucide-react";
import { useEffect, useRef } from "react";

import { SanityImage } from "@/components/sanity-image";
import type { ScatterItem } from "@/features/desktop/desktop";

type PieceModalProps = {
  piece: ScatterItem;
  onClose: () => void;
};

export function PieceModal({ piece, onClose }: PieceModalProps) {
  const close = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const previous = document.activeElement;
    close.current?.focus();

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
      }
    }

    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      if (previous instanceof HTMLElement) previous.focus();
    };
  }, [onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={piece.label}
      data-slot="piece-modal"
      className="fixed inset-0 z-100 flex flex-col bg-ink/95 backdrop-blur-[2px]"
    >
      <button
        type="button"
        aria-label="Close"
        onClick={onClose}
        className="absolute inset-0 cursor-zoom-out"
        tabIndex={-1}
      />

      <div className="relative flex h-9 shrink-0 items-center justify-between gap-4 px-3">
        <p className="truncate font-mono text-xs text-paper">{piece.label}</p>
        <button
          ref={close}
          type="button"
          aria-label="Close"
          onClick={onClose}
          className="relative grid size-4 shrink-0 cursor-pointer place-items-center rounded-full bg-paper text-ink transition-colors before:absolute before:-inset-2.5 hover:bg-mist focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
        >
          <X aria-hidden className="size-2.5" strokeWidth={2.5} />
        </button>
      </div>

      <div className="pointer-events-none relative flex min-h-0 flex-1 items-center justify-center px-3 pb-3">
        <SanityImage
          value={piece.image}
          sizes="100vw"
          eager
          className="max-h-full w-auto max-w-full object-contain"
        />
      </div>

      {(piece.meta || piece.description) && (
        <div className="relative shrink-0 border-t border-paper/20 px-3 py-2">
          <div className="mx-auto flex max-w-[34rem] flex-col gap-1">
            {piece.meta && (
              <p className="font-mono text-[11px] text-mist">{piece.meta}</p>
            )}
            {piece.description && (
              <p className="font-sans text-[13px]/[1.6] text-paper/85">
                {piece.description}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
