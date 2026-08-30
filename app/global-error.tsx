"use client";

import { siteConfig } from "@/features/site/config";

export default function GlobalError({
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  return (
    <html lang={siteConfig.language}>
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "system-ui, sans-serif",
          textAlign: "center",
        }}
      >
        <main style={{ padding: "2rem" }}>
          <h1 style={{ fontSize: "1.5rem", fontWeight: 600 }}>
            Something went wrong
          </h1>
          <button
            type="button"
            onClick={() => retry()}
            style={{
              marginTop: "1.5rem",
              padding: "0.5rem 1rem",
              borderRadius: "0.5rem",
              border: "1px solid currentColor",
              background: "transparent",
              font: "inherit",
              cursor: "pointer",
            }}
          >
            Try again
          </button>
        </main>
      </body>
    </html>
  );
}
