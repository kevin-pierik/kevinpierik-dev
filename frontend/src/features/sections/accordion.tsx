"use client";

import { type ReactNode, useId, useState } from "react";

import { focus } from "@/components/link";

type AccordionItem = {
  key: string;
  title: string;
  heading: ReactNode;
  panel: ReactNode;
};

type AccordionProps = {
  label?: string;
  items: AccordionItem[];
};

export function Accordion({ label, items }: AccordionProps) {
  const [open, setOpen] = useState(0);
  const id = useId();

  return (
    <ol aria-label={label} className="grid gap-3">
      {items.map((item, index) => {
        const expanded = open === index;
        const panelId = `${id}-${index}`;

        return (
          <li
            className={`rounded-2xl transition-colors duration-200 ${expanded ? "bg-subtle" : ""}`}
            key={item.key}
          >
            <div className="group relative">
              <button
                aria-controls={panelId}
                aria-expanded={expanded}
                className={`absolute inset-0 cursor-pointer rounded-2xl ${focus}`}
                onClick={() => setOpen(expanded ? -1 : index)}
                type="button"
              >
                <span className="sr-only">More about {item.title}</span>
                <span
                  aria-hidden="true"
                  className="absolute top-1/2 right-4 grid size-8 -translate-y-1/2 place-items-center text-muted transition-colors group-hover:text-foreground site:right-5"
                >
                  <svg
                    className={`size-3.5 transition-transform duration-200 ${expanded ? "rotate-45" : ""}`}
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeWidth="1.5"
                    viewBox="0 0 14 14"
                  >
                    <path d="M7 2v10M2 7h10" />
                  </svg>
                </span>
              </button>
              <h3 className="pointer-events-none relative grid gap-1 p-5 pr-16 site:p-6 site:pr-18">
                {item.heading}
              </h3>
            </div>
            <div
              className={`grid transition-[grid-template-rows] duration-200 ease-out ${expanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
              id={panelId}
              inert={!expanded}
            >
              <div className="min-h-0 overflow-hidden">{item.panel}</div>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
