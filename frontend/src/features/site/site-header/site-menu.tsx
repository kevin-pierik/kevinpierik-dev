"use client";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@ui-sdk/react/dialog";
import { type ReactNode, useEffect, useState } from "react";

import { focus } from "@/components/link";

type SiteMenuProps = {
  barClassName: string;
  identity: ReactNode;
  children: ReactNode;
};

const menuButton = `-mr-2.5 grid size-11 place-items-center rounded-full ${focus}`;

function MenuIcon() {
  return (
    <span aria-hidden="true" className="menu-icon">
      <span />
      <span />
    </span>
  );
}

export function SiteMenu({ barClassName, identity, children }: SiteMenuProps) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const wide = matchMedia("(min-width: 50rem)");
    const onChange = () => {
      if (wide.matches) setOpen(false);
    };
    wide.addEventListener("change", onChange);
    return () => wide.removeEventListener("change", onChange);
  }, []);

  return (
    <Dialog onOpenChange={setOpen} open={open}>
      <DialogTrigger className={`${menuButton} site:hidden`}>
        <MenuIcon />
        <span className="sr-only">Menu</span>
      </DialogTrigger>
      <DialogContent
        className="site-menu fixed inset-0 m-0 flex size-full max-h-none max-w-none flex-col overflow-y-auto border-0 bg-background p-0 text-foreground"
        data-lenis-prevent
        onClick={(event) => {
          if ((event.target as Element).closest("a")) setOpen(false);
        }}
      >
        <DialogTitle className="sr-only">Menu</DialogTitle>
        <div className={barClassName}>
          {identity}
          <DialogClose className={menuButton}>
            <MenuIcon />
            <span className="sr-only">Close menu</span>
          </DialogClose>
        </div>
        {children}
      </DialogContent>
    </Dialog>
  );
}
