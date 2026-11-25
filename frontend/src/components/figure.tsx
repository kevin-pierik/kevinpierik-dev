import type { ReactNode } from "react";

export const figureSizes = {
  normal: "(min-width: 1440px) 886px, (min-width: 800px) 62vw, 100vw",
  wide: "(min-width: 1440px) 1112px, (min-width: 800px) 77vw, 100vw",
};

type FigureProps = {
  children: ReactNode;
  caption?: ReactNode;
  wide?: boolean;
  className?: string;
};

export function Figure({ children, caption, wide, className }: FigureProps) {
  return (
    <figure className={className} data-wide={wide || undefined}>
      {children}
      {caption ? (
        <figcaption className="mt-[0.5lh] text-center text-balance text-muted">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
