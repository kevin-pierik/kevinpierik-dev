import "server-only";

import { cache } from "react";

import { isSanityConfigured } from "@/env";
import { defaultWindows, windowsByPlacement } from "@/features/desktop/defaults";
import {
  HOME_WINDOWS_QUERY,
  PROJECT_SLUGS_QUERY,
  PROJECT_WINDOW_QUERY,
  PROJECT_WINDOWS_QUERY,
  SHELL_QUERY,
  STANDALONE_SLUGS_QUERY,
  STANDALONE_WINDOW_QUERY,
} from "@/features/desktop/query";
import type {
  DesktopItem,
  WindowDocument,
  WindowPlacement,
} from "@/features/desktop/types";
import { sanityFetch } from "@/features/sanity/live";
import {
  type Nullable,
  type RawSeo,
  text,
  toSeo,
} from "@/features/sanity/normalise";
import type { PortableTextValue } from "@/features/rich-text/types";
import { settingsDefaults, toSettings } from "@/features/site/resolve";
import type { Settings } from "@/features/site/types";

type RawWindow = {
  _id: string;
  label?: Nullable;
  title?: Nullable;
  slug?: Nullable;
  placement?: Nullable;
  body?: PortableTextValue;
  details?: ({ label?: Nullable; value?: Nullable } | null)[] | null;
  file?: { url?: Nullable; originalFilename?: Nullable } | null;
  seo?: RawSeo;
};

const placements: WindowPlacement[] = [
  "home",
  "project",
  "standalone",
  "corner",
];

function toPlacement(value: Nullable): WindowPlacement {
  const cleaned = text(value);
  return placements.find((item) => item === cleaned) ?? "home";
}

function toItem(window: RawWindow): DesktopItem | null {
  const id = text(window.slug);
  if (!id) return null;

  const label = text(window.label) ?? id;

  return {
    id,
    label,
    title: text(window.title) ?? label,
    placement: toPlacement(window.placement),
  };
}

function toWindow(window: RawWindow): WindowDocument | null {
  const item = toItem(window);
  if (!item) return null;

  const url = text(window.file?.url);

  return {
    ...item,
    body: window.body ?? [],
    details: (window.details ?? []).flatMap((detail) => {
      const label = text(detail?.label);
      const value = text(detail?.value);
      return label && value ? [{ label, value }] : [];
    }),
    file: url
      ? { url, name: text(window.file?.originalFilename) ?? "document.pdf" }
      : null,
    seo: toSeo(window.seo),
  };
}

export const getShell = cache(
  async (): Promise<{ settings: Settings; corner: WindowDocument[] }> => {
    if (!isSanityConfigured) {
      return {
        settings: settingsDefaults,
        corner: windowsByPlacement("corner"),
      };
    }

    const { data } = await sanityFetch({ query: SHELL_QUERY });
    const corner = data.corner.flatMap((window) => toWindow(window) ?? []);

    return {
      settings: toSettings(data.settings),
      corner: corner.length > 0 ? corner : windowsByPlacement("corner"),
    };
  },
);

export async function getHomeWindows(): Promise<WindowDocument[]> {
  if (!isSanityConfigured) return windowsByPlacement("home");

  const { data } = await sanityFetch({ query: HOME_WINDOWS_QUERY });
  const windows = data.flatMap((window) => toWindow(window) ?? []);

  return windows.length > 0 ? windows : windowsByPlacement("home");
}

export async function getProjects(): Promise<DesktopItem[]> {
  if (!isSanityConfigured) return windowsByPlacement("project");

  const { data } = await sanityFetch({ query: PROJECT_WINDOWS_QUERY });
  const projects = data.flatMap((window) => toItem(window) ?? []);

  return projects.length > 0 ? projects : windowsByPlacement("project");
}

export const getProject = cache(
  async (slug: string): Promise<WindowDocument | null> => {
    const fallback =
      defaultWindows.find(
        (item) => item.placement === "project" && item.id === slug,
      ) ?? null;

    if (!isSanityConfigured) return fallback;

    const { data } = await sanityFetch({
      query: PROJECT_WINDOW_QUERY,
      params: { slug },
    });

    return (data ? toWindow(data) : null) ?? fallback;
  },
);

export async function getProjectSlugs() {
  if (!isSanityConfigured) {
    return windowsByPlacement("project").map((window) => ({
      slug: window.id,
    }));
  }

  const { data } = await sanityFetch({
    query: PROJECT_SLUGS_QUERY,
    perspective: "published",
    stega: false,
  });

  return data.flatMap((entry) => (entry.slug ? [{ slug: entry.slug }] : []));
}

export const getStandalonePage = cache(
  async (slug: string): Promise<WindowDocument | null> => {
    if (!isSanityConfigured) return null;

    const { data } = await sanityFetch({
      query: STANDALONE_WINDOW_QUERY,
      params: { slug },
    });

    return data ? toWindow(data) : null;
  },
);

export async function getStandaloneSlugs() {
  if (!isSanityConfigured) return [];

  const { data } = await sanityFetch({
    query: STANDALONE_SLUGS_QUERY,
    perspective: "published",
    stega: false,
  });

  return data.flatMap((entry) => (entry.slug ? [{ slug: entry.slug }] : []));
}
