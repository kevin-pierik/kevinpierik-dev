"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";

const reducedMotion = "(prefers-reduced-motion: reduce)";

function subscribe(onChange: () => void) {
  const query = matchMedia(reducedMotion);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

function usePrefersReducedMotion() {
  return useSyncExternalStore(
    subscribe,
    () => matchMedia(reducedMotion).matches,
    () => true,
  );
}

type Caption = {
  id: string | null;
  language_code: string | null;
  name: string | null;
};

type VideoProps = {
  playbackId: string;
  captions: Caption[];
  title: string;
  aspectRatio?: string;
  autoplay: boolean;
  className?: string;
};

export function Video({
  playbackId,
  captions,
  title,
  aspectRatio,
  autoplay,
  className,
}: VideoProps) {
  const ref = useRef<HTMLVideoElement>(null);
  const reduceMotion = usePrefersReducedMotion();
  const loops = autoplay && !reduceMotion;

  useEffect(() => {
    const video = ref.current;
    if (!video) return;

    video.muted = loops;
    if (loops) video.play().catch(() => {});
    else video.pause();
  }, [loops]);

  return (
    // eslint-disable-next-line jsx-a11y/media-has-caption -- captions are the Mux text tracks rendered below
    <video
      aria-label={title}
      className={className}
      controls
      crossOrigin="anonymous"
      loop={loops}
      playsInline
      poster={`https://image.mux.com/${playbackId}/thumbnail.webp?width=1600`}
      preload="metadata"
      ref={ref}
      style={{ aspectRatio }}
    >
      <source
        src={`https://stream.mux.com/${playbackId}.m3u8`}
        type="application/vnd.apple.mpegurl"
      />
      <source
        src={`https://stream.mux.com/${playbackId}/highest.mp4`}
        type="video/mp4"
      />
      {captions.map((caption, index) =>
        caption.id ? (
          <track
            default={index === 0}
            key={caption.id}
            kind="captions"
            label={caption.name ?? caption.language_code ?? "Captions"}
            src={`https://stream.mux.com/${playbackId}/text/${caption.id}.vtt`}
            srcLang={caption.language_code ?? undefined}
          />
        ) : null,
      )}
    </video>
  );
}
