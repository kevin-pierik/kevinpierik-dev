import type { Metadata } from "next";

import { WorksDesktop } from "@/components/desktop/works-desktop";

export const metadata: Metadata = {
  title: "Extra",
  alternates: { canonical: "/works" },
};

export default function Works() {
  return <WorksDesktop />;
}
