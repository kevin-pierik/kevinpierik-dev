import NextLink from "next/link";
import type { ComponentProps } from "react";

export const focus =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring";

export const linkStyles = {
  text: `underline decoration-foreground/25 underline-offset-[3px] transition-colors hover:decoration-foreground focus-visible:decoration-foreground ${focus}`,
  nav: `underline-offset-[3px] hover:underline ${focus}`,
  subtle: `inline-flex min-h-8 items-center bg-subtle px-3 text-foreground transition-colors hover:bg-subtle-hover ${focus}`,
};

type LinkProps = ComponentProps<typeof NextLink> & {
  variant?: keyof typeof linkStyles;
};

export function Link({ variant = "text", className, ...props }: LinkProps) {
  return (
    <NextLink
      className={[linkStyles[variant], className].filter(Boolean).join(" ")}
      {...props}
    />
  );
}
