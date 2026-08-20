import type { Metadata } from "next";

import { WorksDesktop } from "@/components/desktop/works-desktop";

export const metadata: Metadata = {
  title: "Curriculum Vitae",
  alternates: { canonical: "/works/curriculum-vitae" },
};

export default function CurriculumVitae() {
  return <WorksDesktop activeProjectId="curriculum-vitae" />;
}
