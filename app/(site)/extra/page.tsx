import type { Metadata } from "next";

import { ExtraScreen } from "@/features/desktop/extra-screen";

export const metadata: Metadata = {
  title: "Extra",
  alternates: { canonical: "/extra" },
};

export default function Works() {
  return <ExtraScreen />;
}
