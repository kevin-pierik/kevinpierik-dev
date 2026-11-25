import type { ReactNode } from "react";

import { focus } from "@/components/link";

type TableProps = {
  children: ReactNode;
  className?: string;
};

export function Table({ children, className }: TableProps) {
  return (
    <div
      aria-label="Table"
      className={`overflow-x-auto rounded-2xl bg-background ring-1 ring-foreground/15 dark:bg-foreground/3 dark:ring-foreground/10 ${focus} ${className ?? ""}`}
      data-table=""
      role="region"
      // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
      tabIndex={0}
    >
      <table className="w-full border-collapse text-left tabular-nums [&_code]:bg-transparent [&_code]:p-0 [&_td]:border-b [&_td]:border-foreground/10 [&_td]:px-4 [&_td]:py-2.5 [&_td]:align-top [&_th]:border-b [&_th]:border-foreground/15 [&_th]:px-4 [&_th]:py-2.5 [&_th]:align-bottom [&_th]:text-[0.8125rem] [&_th]:font-normal [&_th]:whitespace-nowrap [&_th]:text-muted [&_tr:last-child>td]:border-b-0">
        {children}
      </table>
    </div>
  );
}
