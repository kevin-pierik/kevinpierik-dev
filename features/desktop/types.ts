import type { PortableTextValue } from "@/features/rich-text/types";
import type { SeoFields } from "@/features/site/types";

export type WindowPlacement = "home" | "project" | "standalone" | "corner";

export type DesktopItem = {
  id: string;
  label: string;
  title: string;
  placement: WindowPlacement;
  cover?: WindowCover | null;
};

export type WindowCover = {
  alt: string;
  asset: { _ref?: string };
};

export type WindowDetail = {
  label: string;
  value: string;
};

export type WindowFile = {
  url: string;
  name: string;
};

export type WindowDocument = DesktopItem & {
  slug?: string;
  body: PortableTextValue;
  details: WindowDetail[];
  cover: WindowCover | null;
  file: WindowFile | null;
  seo: SeoFields;
};
