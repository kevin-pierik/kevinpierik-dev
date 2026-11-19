import { type NextRequest, NextResponse } from "next/server";

import { proxyPath } from "@/features/i18n/proxy-path";

export function proxy(request: NextRequest) {
  const action = proxyPath(request.nextUrl.pathname);
  if (action.type === "next") return NextResponse.next();

  const url = request.nextUrl.clone();
  url.pathname = action.pathname;

  return action.type === "redirect"
    ? NextResponse.redirect(url, 308)
    : NextResponse.rewrite(url);
}

export const config = {
  matcher: ["/((?!_next/|.*\\.).*)"],
};
