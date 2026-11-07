import Link from "next/link";

import { RebootShortcut, RequestedRoute } from "./bios-client";

export function BiosScreen() {
  return (
    <div className="flex h-svh flex-col bg-[#0000a8] bg-[radial-gradient(ellipse_at_top,#0000a8,#000088)] font-mono text-[clamp(0.75rem,2.4vw,0.85rem)]/[1.55] text-[#c6c6c6]">
      <header className="flex shrink-0 items-center justify-between gap-6 bg-[#a8a8a8] px-3 py-1 font-semibold text-[#000080]">
        <p>KPBIOS(C)2026 Kevin Pierik Systems, Inc.</p>
        <p>v4.0.4</p>
      </header>
      <main
        aria-labelledby="error-title"
        className="flex-1 overflow-y-auto px-3 py-6 wrap-anywhere sm:px-6"
        id="main"
      >
        <p>
          BIOS Date: 08/19/26 17:42:04 Ver: 4.0.4
          <br />
          Kevin Pierik Web Core(tm) CPU @ 3.40GHz
          <br />
          Speed: 3400 MHz
        </p>
        <p className="mt-[1lh] text-[#54fcfc]">
          Press any key to run Setup, ESC for Boot Menu
          <br />
          Initializing static routes .. Done.
          <br />
          65536MB OK
        </p>
        <p className="mt-[1lh]">Auto-Detecting HTTP routes ...</p>
        <ul className="pl-[2ch] *:flex *:gap-x-[4ch]">
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
        <h1 className="mt-[1lh] text-white" id="error-title">
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
          className="inline-flex min-h-12 items-center px-2 underline-offset-2 hover:underline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[#000080]"
          href="/"
        >
          Press Enter to reboot
        </Link>
        <ul className="flex gap-x-[2ch] px-2">
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
