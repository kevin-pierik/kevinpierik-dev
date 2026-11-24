import type { Metadata } from "next";

import { Link } from "@/components/link";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <main
      aria-labelledby="main-title"
      className="site-container py-6 text-muted sm:pt-8"
      id="main"
    >
      <h1 className="sr-only" id="main-title">
        Page not found
      </h1>
      <p>
        The page you’re looking for can’t be found.{" "}
        <Link href="/">Return to homepage.</Link>
      </p>
    </main>
  );
}
