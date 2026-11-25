import NextLink from "next/link";
import type { ComponentProps } from "react";

export const focus =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring";

export const linkStyles = {
  text: `underline decoration-foreground/25 underline-offset-[3px] transition-colors hover:decoration-foreground focus-visible:decoration-foreground ${focus}`,
  nav: `underline-offset-[3px] hover:underline ${focus}`,
  pill: `inline-flex items-center rounded-full px-3 py-1.5 transition-colors hover:bg-subtle hover:text-foreground ${focus}`,
  plain: focus,
  subtle: `inline-flex min-h-8 items-center bg-subtle px-3 text-foreground transition-colors hover:bg-subtle-hover ${focus}`,
};

type LinkProps = ComponentProps<typeof NextLink> & {
  variant?: keyof typeof linkStyles;
};

function isExternal(href: LinkProps["href"]) {
  return (
    typeof href === "string" &&
    (href.startsWith("http://") || href.startsWith("https://"))
  );
}

export function Link({
  variant = "text",
  className,
  children,
  ...props
}: LinkProps) {
  return (
    <NextLink
      className={[linkStyles[variant], className].filter(Boolean).join(" ")}
      {...props}
    >
      {children}
      {isExternal(props.href) ? (
        <>
          {" "}
          <span aria-hidden="true" className="text-muted">
            ↗
          </span>
        </>
      ) : null}
    </NextLink>
  );
}
