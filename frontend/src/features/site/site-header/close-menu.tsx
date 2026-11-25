"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

export function CloseMenu({ id }: { id: string }) {
  const pathname = usePathname();

  useEffect(() => {
    const menu = document.getElementById(id);
    if (!menu) return;
    if (menu.matches(":popover-open")) menu.hidePopover();

    const outside = () =>
      [...document.body.children, ...(menu.parentElement?.children ?? [])]
        .filter((element) => element !== menu && !element.contains(menu))
        .filter((element): element is HTMLElement => "inert" in element);

    const onToggle = (event: Event) => {
      const open = (event as ToggleEvent).newState === "open";
      for (const element of outside()) element.inert = open;
    };
    const onClick = (event: Event) => {
      if ((event.target as Element).closest("a")) menu.hidePopover();
    };

    menu.addEventListener("toggle", onToggle);
    menu.addEventListener("click", onClick);
    return () => {
      menu.removeEventListener("toggle", onToggle);
      menu.removeEventListener("click", onClick);
      for (const element of outside()) element.inert = false;
    };
  }, [id, pathname]);

  return null;
}
