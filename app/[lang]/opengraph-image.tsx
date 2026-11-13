import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

import {
  defaultLocale,
  getDictionary,
  hasLocale,
  prefixedLocales,
} from "@/features/i18n";

export const alt = "Kevin Pierik, frontend developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return prefixedLocales.map((lang) => ({ lang }));
}

const fontsDirectory = join(
  process.cwd(),
  "node_modules/geist/dist/fonts/geist-sans",
);

export default async function Image({
  params,
}: {
  params?: Promise<{ lang?: string }>;
}) {
  const { lang } = (await params) ?? {};
  const { role } = getDictionary(
    lang && hasLocale(lang) ? lang : defaultLocale,
  );
  const [regular, medium] = await Promise.all([
    readFile(join(fontsDirectory, "Geist-Regular.ttf")),
    readFile(join(fontsDirectory, "Geist-Medium.ttf")),
  ]);

  return new ImageResponse(
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        width: "100%",
        height: "100%",
        padding: 72,
        backgroundColor: "#ffffff",
        color: "#000000",
        fontFamily: "Geist",
        fontSize: 44,
        lineHeight: 1.4,
        letterSpacing: "-0.02em",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ fontWeight: 500 }}>Kevin Pierik</div>
        <div style={{ color: "#6b6b6b" }}>{role}</div>
      </div>
      <div style={{ color: "#6b6b6b", fontSize: 28 }}>kevinpierik.dev</div>
    </div>,
    {
      ...size,
      fonts: [
        { name: "Geist", data: regular, weight: 400, style: "normal" },
        { name: "Geist", data: medium, weight: 500, style: "normal" },
      ],
    },
  );
}
