import {
  Accordion as AccordionRoot,
  AccordionHeader,
  AccordionItem,
  AccordionPanel,
  AccordionTrigger,
} from "@ui-sdk/react/accordion";
import type { ReactNode } from "react";

import { focus } from "@/components/link";

type Item = {
  key: string;
  title: string;
  heading: ReactNode;
  panel: ReactNode;
};

type AccordionProps = {
  label?: string;
  items: Item[];
};

export function Accordion({ label, items }: AccordionProps) {
  return (
    <AccordionRoot
      defaultValue={items[0] ? [items[0].key] : []}
      hiddenUntilFound
      render={<ol aria-label={label} className="grid gap-3" />}
    >
      {items.map((item) => (
        <AccordionItem
          className="rounded-2xl transition-colors duration-200 data-open:bg-subtle"
          key={item.key}
          render={<li />}
          value={item.key}
        >
          <AccordionHeader render={<div className="group relative" />}>
            <h3 className="pointer-events-none relative z-1 grid gap-1 p-5 pr-16 site:p-6 site:pr-18">
              {item.heading}
            </h3>
            <AccordionTrigger
              className={`absolute inset-0 cursor-pointer rounded-2xl ${focus}`}
            >
              <span className="sr-only">More about {item.title}</span>
              <span
                aria-hidden="true"
                className="absolute top-1/2 right-4 grid size-8 -translate-y-1/2 place-items-center text-muted transition-colors group-hover:text-foreground site:right-5"
              >
                <svg
                  className="size-3.5 transition-transform duration-200 group-data-open:rotate-45"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeWidth="1.5"
                  viewBox="0 0 14 14"
                >
                  <path d="M7 2v10M2 7h10" />
                </svg>
              </span>
            </AccordionTrigger>
          </AccordionHeader>
          <AccordionPanel className="h-(--accordion-panel-height) overflow-hidden transition-[height] duration-200 ease-out data-ending-style:h-0 data-starting-style:h-0">
            {item.panel}
          </AccordionPanel>
        </AccordionItem>
      ))}
    </AccordionRoot>
  );
}
