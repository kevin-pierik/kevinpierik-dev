import { defaultLocale, hasLocale } from "./config";

export type ProxyAction =
  | { type: "next" }
  | { type: "redirect"; pathname: string }
  | { type: "rewrite"; pathname: string };

export function proxyPath(pathname: string): ProxyAction {
  const [, first = ""] = pathname.split("/");

  if (first === defaultLocale) {
    if (pathname.includes("/opengraph-image")) return { type: "next" };
    return {
      type: "redirect",
      pathname: pathname.slice(defaultLocale.length + 1) || "/",
    };
  }

  if (hasLocale(first)) return { type: "next" };

  return {
    type: "rewrite",
    pathname: `/${defaultLocale}${pathname === "/" ? "" : pathname}`,
  };
}
