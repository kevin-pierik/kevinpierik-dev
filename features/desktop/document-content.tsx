import type { ReactNode } from "react";

import { cn } from "@/features/style/utils";

export type DocumentDetail = {
  label: string;
  value: ReactNode;
};

type DocumentContentProps = {
  details: DocumentDetail[];
  children: ReactNode;
  footer?: ReactNode;
  className?: string;
  bodyClassName?: string;
  bodyLayout?: "article" | "full";
};

export function DocumentContent({
  details,
  children,
  footer,
  className,
  bodyClassName,
  bodyLayout = "article",
}: DocumentContentProps) {
  return (
    <article
      data-slot="document-content"
      className={cn("flex min-h-0 flex-1 flex-col", className)}
    >
      <div
        data-slot="document-metadata"
        className="shrink-0 border-b border-paper/25 p-2"
      >
        <dl className="grid grid-cols-2 gap-y-1 font-mono text-[11px]/relaxed">
          {details.map(({ label, value }) => (
            <div key={label} className="contents">
              <dt className="text-mist uppercase">[{label}]</dt>
              <dd className="min-w-0 text-paper">{value}</dd>
            </div>
          ))}
        </dl>
      </div>

      <div
        data-slot="document-body"
        className={cn("min-h-0 flex-1 overflow-y-auto", bodyClassName)}
      >
        {bodyLayout === "article" ? (
          <div className="mx-auto w-full max-w-document px-6 py-8 lg:px-8">
            {children}
          </div>
        ) : (
          children
        )}
      </div>

      {footer}
    </article>
  );
}
