import type { Metadata } from "next";

import { HomeScreen } from "@/features/desktop/home-screen";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function Home() {
  return <HomeScreen />;
}
