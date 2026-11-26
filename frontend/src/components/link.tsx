import NextLink from "next/link";
import type { ComponentProps } from "react";
import { ArrowUpRight } from "lucide-react";

const ring = "focus-visible:outline-3 focus-visible:outline-focus";

export const focus = `${ring} focus-visible:outline-offset-0`;

export const focusText = `${ring} focus-visible:rounded-sm focus-visible:outline-offset-2`;

export const linkStyles = {
  text: `underline decoration-foreground/25 underline-offset-[3px] transition-colors hover:decoration-foreground focus-visible:decoration-foreground ${focusText}`,
  nav: `underline-offset-[3px] hover:underline ${focusText}`,
  pill: `inline-flex items-center rounded-full px-3 py-1.5 transition-colors pointer-coarse:min-h-11 hover:bg-subtle hover:text-foreground ${focus}`,
  plain: focusText,
  primary: `inline-flex min-h-8 items-center gap-1.5 rounded-full bg-foreground px-3.5 py-1.5 font-medium text-background transition-opacity pointer-coarse:min-h-11 hover:opacity-80 ${ring} focus-visible:outline-offset-2`,
  outline: `inline-flex min-h-8 items-center gap-1.5 rounded-full border bg-background px-3.5 py-1.5 font-medium text-foreground transition-colors pointer-coarse:min-h-11 hover:bg-subtle ${focus}`,
  subtle: `inline-flex min-h-8 items-center gap-1 rounded-full bg-subtle px-3 text-foreground transition-colors hover:bg-subtle-hover ${focus}`,
};

type LinkProps = ComponentProps<typeof NextLink> & {
  variant?: keyof typeof linkStyles;
};

function isFile(href: LinkProps["href"]) {
  return typeof href === "string" && /\.(xml|txt)$/.test(href);
}

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
      prefetch={isFile(props.href) ? false : undefined}
      {...props}
    >
      {children}
      {isExternal(props.href) ? (
        <span className="whitespace-nowrap">
          {"\u00A0"}
          <ArrowUpRight className="inline size-[1em] align-[-0.125em] text-muted" />
        </span>
      ) : null}
    </NextLink>
  );
}
