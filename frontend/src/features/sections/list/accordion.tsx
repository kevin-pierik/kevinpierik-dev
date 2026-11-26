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
                  className="size-5 transition-transform duration-200 group-data-open:rotate-45"
                  fill="currentColor"
                  viewBox="0 -960 960 960"
                >
                  <path d="M444-444H276q-15.3 0-25.65-10.29Q240-464.58 240-479.79t10.35-25.71Q260.7-516 276-516h168v-168q0-15.3 10.29-25.65Q464.58-720 479.79-720t25.71 10.35Q516-699.3 516-684v168h168q15.3 0 25.65 10.29Q720-495.42 720-480.21t-10.35 25.71Q699.3-444 684-444H516v168q0 15.3-10.29 25.65Q495.42-240 480.21-240t-25.71-10.35Q444-260.7 444-276v-168Z" />
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
