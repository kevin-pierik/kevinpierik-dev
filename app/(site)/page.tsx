import type { Metadata } from "next";

import { ResumePage } from "@/features/resume/resume-page";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function Home() {
  return <ResumePage />;
}
