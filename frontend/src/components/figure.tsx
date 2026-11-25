import type { ReactNode } from "react";

export const figureSizes = {
  normal: "(min-width: 952px) 885px, 93vw",
  wide: "(min-width: 1204px) 1120px, 93vw",
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
