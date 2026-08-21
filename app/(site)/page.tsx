import type { Metadata } from "next";

import { HomeScreen } from "@/features/desktop/home-screen";
import { JsonLd } from "@/components/json-ld";
import { getSettings } from "@/features/site/resolve";
import {
  websiteStructuredData,
} from "@/features/site/seo/structured-data";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default async function Home() {
  const settings = await getSettings();

  return (
    <>
      <JsonLd data={websiteStructuredData(settings)} />
      <HomeScreen />
    </>
  );
}
