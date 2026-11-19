import { type NextRequest, NextResponse } from "next/server";

import { proxyPath } from "@/features/i18n/proxy-path";

const defaultLocaleRewriteHeader = "x-internal-default-locale-rewrite";

export function proxy(request: NextRequest) {
  if (request.headers.get(defaultLocaleRewriteHeader) === "1") {
    const headers = new Headers(request.headers);
    headers.delete(defaultLocaleRewriteHeader);
    return NextResponse.next({ request: { headers } });
  }

  const action = proxyPath(request.nextUrl.pathname);
  if (action.type === "next") return NextResponse.next();

  const url = request.nextUrl.clone();
  url.pathname = action.pathname;

  return action.type === "redirect"
    ? NextResponse.redirect(url, 308)
    : NextResponse.rewrite(url, {
        request: {
          headers: new Headers([
            ...request.headers,
            [defaultLocaleRewriteHeader, "1"],
          ]),
        },
      });
}

export const config = {
  matcher: ["/((?!_next/|.*\\.).*)"],
};
