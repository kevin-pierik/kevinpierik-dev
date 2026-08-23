import { ImageResponse } from "next/og";
import { toPlainText } from "@portabletext/react";

import { getHomeWindows, getShell } from "@/features/desktop/resolve";
import { siteConfig } from "@/features/site/config";

export const alt = `${siteConfig.name} — ${siteConfig.domain}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const line = "1px solid rgba(255,255,255,0.2)";

export default async function OpengraphImage() {
  const [settings, windows] = await Promise.all([
    getShell(),
    getHomeWindows(),
  ]);

  const feature = windows[0];
  const body = feature?.body;
  const intro = body
    ? toPlainText(Array.isArray(body) ? body : [body]).split("\n")[0]
    : settings.description;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background: "#232323",
          color: "#ffffff",
          padding: "0 14px 14px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            height: 68,
            padding: "0 18px",
            fontSize: 26,
          }}
        >
          <span>{settings.name}</span>
          <span style={{ color: "#dedede" }}>[NL]</span>
        </div>

        <div
          style={{
            display: "flex",
            flex: 1,
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            borderLeft: line,
            borderRight: line,
            borderBottom: line,
            borderTop: line,
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: 720,
              border: "1px solid rgba(255,255,255,0.28)",
              padding: 6,
            }}
          >
            <div style={{ display: "flex", padding: "10px 12px", fontSize: 22 }}>
              {feature?.title ?? "About"}
            </div>

            <div
              style={{
                display: "flex",
                border: "1px solid rgba(255,255,255,0.28)",
                padding: "22px 20px",
                fontSize: 27,
                lineHeight: 1.5,
              }}
            >
              {intro}
            </div>
          </div>
        </div>
      </div>
    ),
    size,
  );
}
