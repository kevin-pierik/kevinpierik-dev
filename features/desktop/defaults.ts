import type { WindowDocument } from "@/features/desktop/types";

export const defaultWindows: WindowDocument[] = [];

export const windowsByPlacement = (placement: WindowDocument["placement"]) =>
  defaultWindows.filter((window) => window.placement === placement);
