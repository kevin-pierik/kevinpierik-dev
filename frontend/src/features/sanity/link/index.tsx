import type { ReactNode } from "react";

import { Link, type linkStyles } from "@/components/link";

import { safeHref } from "./safe-href";

type SanityLinkProps = {
  href: string | null | undefined;
  variant?: keyof typeof linkStyles;
  className?: string;
  children: ReactNode;
};

export function SanityLink({
  href,
  variant,
  className,
  children,
}: SanityLinkProps) {
  const safe = safeHref(href);
  if (!safe) return children;

  return (
    <Link className={className} href={safe} variant={variant}>
      {children}
    </Link>
  );
}
