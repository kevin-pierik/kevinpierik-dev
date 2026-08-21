import { siteConfig } from "@/features/site/config";

export type BiosLine = {
  text: string;
  tone: "dim" | "cyan" | "bright";
};

const dim = (text: string): BiosLine => ({ text, tone: "dim" });
const cyan = (text: string): BiosLine => ({ text, tone: "cyan" });
const bright = (text: string): BiosLine => ({ text, tone: "bright" });

export const biosScreen = {
  vendor: `KPBIOS(C)2026 ${siteConfig.name} Systems, Inc.`,
  version: "v4.0.4",
  rebootHref: "/",
  rebootLabel: "Press any key to reboot",
  keyHints: "F1: Home  ESC: Home",
};

export const biosBootLog: BiosLine[] = [
  dim("BIOS Date: 08/19/26  17:42:04  Ver: 4.0.4"),
  dim(`${siteConfig.name} Web Core(tm) CPU @ 3.40GHz`),
  dim("Speed: 3400 MHz"),
  dim(""),
  cyan("Press any key to run Setup,  ESC for Boot Menu"),
  cyan("Initializing static routes ..  Done."),
  cyan("65536MB OK"),
  dim(""),
  dim("Auto-Detecting HTTP routes ..."),
  dim("  Route 0 : /            OK"),
];

export const biosError: BiosLine[] = [
  dim(""),
  bright("ERROR 404: Requested route not found on this device."),
  dim("Reboot and select a proper route,"),
  dim("or insert boot media in the selected device and press a key"),
];
