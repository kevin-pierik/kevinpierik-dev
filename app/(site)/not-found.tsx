import type { Metadata } from "next";

import { BiosScreen } from "@/features/bios/bios-screen";

export const metadata: Metadata = {
  title: "Page not found",
  description: "This route does not exist on this device.",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <main id="main" className="h-svh">
      <BiosScreen />
    </main>
  );
}
