"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useSyncExternalStore } from "react";

const dim = "text-[#c6c6c6]";
const cyan = "text-[#54fcfc]";
const bright = "text-white";

const bootLog = [
  { tone: dim, text: "BIOS Date: 08/19/26  17:42:04  Ver: 4.0.4" },
  { tone: dim, text: "Kevin Pierik Web Core(tm) CPU @ 3.40GHz" },
  { tone: dim, text: "Speed: 3400 MHz" },
  { tone: dim, text: " " },
  { tone: cyan, text: "Press any key to run Setup,  ESC for Boot Menu" },
  { tone: cyan, text: "Initializing static routes ..  Done." },
  { tone: cyan, text: "65536MB OK" },
  { tone: dim, text: " " },
  { tone: dim, text: "Auto-Detecting HTTP routes ..." },
  { tone: dim, text: "  Route 0 : /            OK" },
];

const errorLog = [
  { tone: dim, text: " " },
  {
    tone: bright,
    text: "ERROR 404: Requested route not found on this device.",
  },
  { tone: dim, text: "Reboot and select a proper route," },
  {
    tone: dim,
    text: "or insert boot media in the selected device and press a key",
  },
];

const ignoredKeys = new Set(["Tab", "Shift", "Control", "Alt", "Meta"]);

const subscribeToNothing = () => () => {};

function useRequestedRoute(): string {
  return useSyncExternalStore(
    subscribeToNothing,
    () => window.location.pathname,
    () => "Unknown",
  );
}

export function BiosScreen() {
  const route = useRequestedRoute();
  const router = useRouter();

  useEffect(() => {
    function reboot() {
      router.push("/");
    }

    function onKeyDown(event: KeyboardEvent) {
      if (ignoredKeys.has(event.key)) return;
      if (event.metaKey || event.ctrlKey || event.altKey) return;
      reboot();
    }

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("pointerdown", reboot, { once: true });

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("pointerdown", reboot);
    };
  }, [router]);

  return (
    <div className="flex h-full flex-col bg-[#0000a8] bg-[radial-gradient(ellipse_at_top,#0000a8,#000088)] font-mono text-[clamp(0.75rem,2.4vw,0.85rem)]/[1.55] text-[#c6c6c6]">
      <div className="flex shrink-0 items-center justify-between gap-6 bg-[#a8a8a8] px-3 py-1 font-semibold text-[#000080]">
        <span>KPBIOS(C)2026 Kevin Pierik Systems, Inc.</span>
        <span>v4.0.4</span>
      </div>
      <div className="flex-1 overflow-y-auto px-3 py-6 sm:px-6">
        <pre className="wrap-anywhere whitespace-pre-wrap">
          {bootLog.map((line, index) => (
            <span key={`boot-${index}`} className={`block ${line.tone}`}>
              {line.text}
            </span>
          ))}
          <span className={`block ${dim}`}>
            {"  Route 4 : "}
            <span>{route}</span>
            {"    None"}
          </span>
          {errorLog.map((line, index) => (
            <span key={`error-${index}`} className={`block ${line.tone}`}>
              {line.text}
            </span>
          ))}
        </pre>
      </div>
      <div className="flex shrink-0 flex-wrap items-center justify-between gap-x-6 bg-[#a8a8a8] px-1 text-[#000080]">
        <Link
          className="inline-flex min-h-12 items-center px-2 underline-offset-2 hover:underline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[#000080]"
          href="/"
        >
          Press any key to reboot
        </Link>
        <span className="px-2">{"F1: Home  ESC: Home"}</span>
      </div>
    </div>
  );
}
