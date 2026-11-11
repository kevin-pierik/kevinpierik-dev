import Link from "next/link";

import { RebootShortcut, RequestedRoute } from "./bios-client";

export function BiosScreen() {
  return (
    <div className="flex h-svh flex-col bg-[#0000a8] bg-[repeating-linear-gradient(to_bottom,rgb(0_0_0/0.14)_0_1px,transparent_1px_3px),radial-gradient(ellipse_at_top,#0000b4,#00009a)] font-mono text-[clamp(0.75rem,2.4vw,0.8125rem)]/[1.15] text-[#c6c6c6]">
      <header className="flex shrink-0 items-center justify-between gap-6 bg-[#a8a8a8] px-3 py-1 font-semibold text-[#000080]">
        <p>KPBIOS(C)2026 Kevin Pierik Systems, Inc.</p>
        <p>v4.0.4</p>
      </header>
      <main
        aria-labelledby="error-title"
        className="flex-1 overflow-y-auto px-3 py-4 wrap-anywhere sm:px-8"
        id="main"
      >
        <p>
          BIOS Date: 08/19/26 17:42:04 Ver: 4.0.4
          <br />
          <span className="text-white">
            Kevin Pierik Web Core(tm) CPU @ 3.40GHz
          </span>
          <br />
          Speed: 3400 MHz
        </p>
        <p className="mt-[1lh] text-[#54fcfc]">
          Press any key to run Setup, ESC for Boot Menu
          <br />
          Initializing static routes .. Done.
          <br />
          <span className="text-white">65536MB OK</span>
        </p>
        <p className="mt-[1lh]">Auto-Detecting HTTP routes ...</p>
        <ul className="pl-[1.5ch] *:flex *:gap-x-[2ch]">
          <li>
            <span>Route 0 : /</span>
            <span>OK</span>
          </li>
          <li>
            <span>
              Route 4 : <RequestedRoute />
            </span>
            <span>None</span>
          </li>
        </ul>
        <h1
          className="mt-[1lh] text-[1em]/[inherit] font-normal tracking-normal text-white"
          id="error-title"
        >
          ERROR 404: Requested route not found on this device.
        </h1>
        <p>
          Reboot and select a proper route,
          <br />
          or insert boot media in the selected device and press a key
        </p>
      </main>
      <footer className="flex shrink-0 flex-wrap items-center justify-between gap-x-6 bg-[#a8a8a8] px-1 text-[#000080]">
        <Link
          className="inline-flex min-h-6 items-center gap-x-[1ch] px-2 underline-offset-2 hover:underline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[#000080]"
          href="/"
        >
          Press Enter to reboot
          <span
            aria-hidden="true"
            className="inline-block h-[1.1em] w-[0.6em] animate-[blink_1s_steps(1)_infinite] bg-[#000080]"
          />
        </Link>
        <ul className="flex gap-x-[3ch] px-2">
          <li>
            <kbd>F1</kbd>: Home
          </li>
          <li>
            <kbd>ESC</kbd>: Home
          </li>
        </ul>
      </footer>
      <RebootShortcut />
    </div>
  );
}
