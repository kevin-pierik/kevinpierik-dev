import { type ReactNode, useId } from "react";

import { focus } from "@/components/link";

type TableProps = {
  children: ReactNode;
  caption?: ReactNode;
  label: string;
  className?: string;
};

export function Table({ children, caption, label, className }: TableProps) {
  const id = useId();

  return (
    <div
      aria-label={caption ? undefined : label}
      aria-labelledby={caption ? id : undefined}
      className={`overflow-x-auto ${focus} ${className ?? ""}`}
      data-table=""
      role="region"
      // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
      tabIndex={0}
    >
      <table className="w-full border-collapse border border-foreground/15 bg-background text-left tabular-nums dark:border-foreground/10 dark:bg-foreground/3 [&_code]:bg-transparent [&_code]:p-0 [&_td]:border-b [&_td]:border-foreground/10 [&_td]:px-4 [&_td]:py-2.5 [&_td]:align-top [&_th]:border-b [&_th]:border-foreground/15 [&_th]:px-4 [&_th]:py-2.5 [&_th]:align-bottom [&_th]:text-[0.8125rem] [&_th]:font-normal [&_th]:whitespace-nowrap [&_th]:text-muted [&_tr:last-child>td]:border-b-0">
        {caption ? (
          <caption
            className="mt-[0.5lh] caption-bottom text-left text-muted"
            id={id}
          >
            {caption}
          </caption>
        ) : null}
        {children}
      </table>
    </div>
  );
}
