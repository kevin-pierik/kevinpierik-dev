"use client";

import { Button } from "@ui-sdk/react/button";
import NextLink from "next/link";
import type { ComponentProps, ReactNode } from "react";

import { buttonClassName } from "@/components/button";

type LinkVariant = "text" | "nav" | "primary" | "button";

const focusClassName =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring";

const textClassNames = {
  text: `underline decoration-foreground/25 underline-offset-[3px] transition-colors hover:decoration-foreground focus-visible:decoration-foreground ${focusClassName}`,
  nav: `underline-offset-[3px] hover:underline ${focusClassName}`,
};

type LinkProps = Omit<
  ComponentProps<"a">,
  "href" | "children" | "className" | "onClick" | "ref"
> & {
  href: string;
  children: ReactNode;
  variant?: LinkVariant;
  className?: string;
};

export function Link({
  href,
  children,
  variant = "text",
  className,
  ...props
}: LinkProps) {
  const variantClassName =
    variant === "text" || variant === "nav"
      ? textClassNames[variant]
      : buttonClassName(variant === "primary" ? "primary" : "solid");

  return (
    <Button
      className={[variantClassName, className].filter(Boolean).join(" ")}
      render={(buttonProps) => {
        const anchorProps = { ...props, ...buttonProps, type: undefined };

        return href.startsWith("/") ? (
          <NextLink {...anchorProps} href={href}>
            {children}
          </NextLink>
        ) : (
          <a {...anchorProps} href={href}>
            {children}
          </a>
        );
      }}
    />
  );
}
