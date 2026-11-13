"use client";

import { Button } from "@ui-sdk/react/button";
import NextLink from "next/link";
import type { ComponentProps, ReactNode } from "react";

import { buttonClassName } from "@/components/button";

type LinkVariant = "text" | "button";

const textClassName =
  "underline decoration-foreground/35 decoration-1 underline-offset-[0.25em] transition-colors hover:decoration-foreground focus-visible:decoration-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground";

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
    variant === "button" ? buttonClassName("solid") : textClassName;

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
