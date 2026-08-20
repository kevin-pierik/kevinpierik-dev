import { ImageResponse } from "next/og";

import { siteConfig } from "@/config/site";

export const alt = siteConfig.title;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: 80,
          background: "#232323",
          color: "#ffffff",
        }}
      >
        <div style={{ fontSize: 96, fontWeight: 600, letterSpacing: -3 }}>
          {siteConfig.name}
        </div>
        <div style={{ fontSize: 36, color: "#dedede", marginTop: 12 }}>
          {siteConfig.url.replace(/^https?:\/\//, "")}
        </div>
      </div>
    ),
    size,
  );
}
