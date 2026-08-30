import type { Metadata } from "next";

import { JsonLd } from "@/components/json-ld";
import { ResumePage } from "@/features/resume/resume-page";
import { profileStructuredData } from "@/features/site/seo/structured-data";
import { siteConfig } from "@/features/site/config";

export const metadata: Metadata = {
  title: siteConfig.title,
  description: siteConfig.description,
  alternates: {
    canonical: "/",
    languages: { [siteConfig.language]: "/" },
  },
};

export default function Home() {
  return (
    <>
      <JsonLd data={profileStructuredData()} />
      <ResumePage />
    </>
  );
}
