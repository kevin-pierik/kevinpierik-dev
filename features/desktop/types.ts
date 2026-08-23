import type { PortableTextValue } from "@/features/rich-text/types";
import type { SeoFields } from "@/features/site/types";

export type WindowPlacement = "home" | "project" | "standalone" | "corner";

export type DesktopItem = {
  id: string;
  label: string;
  title: string;
  placement: WindowPlacement;
};

export type WindowDetail = {
  label: string;
  value: string;
};

export type WindowMedia = {
  key: string;
  alt: string;
  caption: string | null;
  asset: { _ref?: string };
};

export type WindowFile = {
  url: string;
  name: string;
};

export type WindowDocument = DesktopItem & {
  slug?: string;
  body: PortableTextValue;
  details: WindowDetail[];
  media: WindowMedia[];
  file: WindowFile | null;
  seo: SeoFields;
};
