import type { Metadata } from "next";

import { HomeScreen } from "@/features/desktop/home-screen";
import { getSettings } from "@/features/site/resolve";
import {
  serialiseJsonLd,
  websiteStructuredData,
} from "@/features/site/seo/structured-data";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default async function Home() {
  const settings = await getSettings();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serialiseJsonLd(websiteStructuredData(settings)),
        }}
      />
      <HomeScreen />
    </>
  );
}
