import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

import { ogImage } from "@/features/site";

export const alt = ogImage.alt;
export const size = { width: ogImage.width, height: ogImage.height };
export const contentType = "image/png";

export default async function Image() {
  const [geist, mark] = await Promise.all([
    readFile(
      join(
        process.cwd(),
        "node_modules/geist/dist/fonts/geist-sans/Geist-Medium.ttf",
      ),
    ),
    readFile(
      join(process.cwd(), "src/features/style/fonts/noto-sans-kr-mark.ttf"),
    ),
  ]);

  return new ImageResponse(
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 44,
        width: "100%",
        height: "100%",
        backgroundColor: "#ffffff",
        color: "#000000",
        fontSize: 112,
      }}
    >
      <div style={{ fontFamily: "Noto Sans KR" }}>케빈</div>
      <div style={{ fontFamily: "Geist", letterSpacing: "-0.04em" }}>
        Kevin Pierik
      </div>
    </div>,
    {
      ...size,
      fonts: [
        { name: "Geist", data: geist, weight: 500, style: "normal" },
        { name: "Noto Sans KR", data: mark, weight: 500, style: "normal" },
      ],
    },
  );
}
