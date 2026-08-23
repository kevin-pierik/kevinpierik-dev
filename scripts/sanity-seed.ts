import { mkdir, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";

import { defaultWindows } from "@/features/desktop/defaults";
import { paragraph } from "@/features/rich-text/paragraph";
import { siteConfig } from "@/features/site/config";

const target = join(process.cwd(), "seed", "content.ndjson");

const settings = {
  _id: "siteSettings",
  _type: "settings",
  name: siteConfig.name,
  title: siteConfig.title,
  description: siteConfig.description,
  email: siteConfig.email,
  version: siteConfig.version,
  social: siteConfig.social.map((link, index) => ({
    _key: `social${index}`,
    _type: "labelledLink",
    ...link,
  })),
  navigation: siteConfig.navigation.map((link, index) => ({
    _key: `nav${index}`,
    _type: "labelledLink",
    ...link,
  })),
};

const windows = defaultWindows.map((window, index) => ({
  _id: `window-${window.id}`,
  _type: "desktopWindow",
  label: window.label,
  title: window.title,
  slug: { _type: "slug", current: window.slug ?? window.id },
  placement: window.placement,
  order: (index + 1) * 10,
  ...(Array.isArray(window.body) && window.body.length > 0
    ? window.placement === "home" || window.placement === "corner"
      ? { text: window.body }
      : { body: window.body }
    : {}),
  ...(window.details.length > 0
    ? {
        details: window.details.map((detail, position) => ({
          _key: `detail${position}`,
          _type: "detail",
          ...detail,
        })),
      }
    : {}),
  ...(window.file
    ? {
        file: {
          _type: "file",
          _sanityAsset: `file@file://../public${window.file.url}`,
        },
      }
    : {}),
}));

const post = {
  _id: "post-first-post",
  _type: "post",
  title: "First post",
  slug: { _type: "slug", current: "first-post" },
  publishedAt: "2026-08-21T09:00:00.000Z",
  excerpt:
    "A placeholder so the Writing screen has something to show. Rewrite or delete it in the Studio.",
  body: [
    paragraph(
      "seedpost1",
      "Every window on this site is a document in Sanity. Open the Studio, edit the text, and the screen updates.",
    ),
    paragraph(
      "seedpost2",
      "This post exists so the Writing screen is not empty on the first run. Rewrite it, or delete it and write your own.",
    ),
  ],
};

const documents = [settings, ...windows, post];
const ndjson = `${documents.map((doc) => JSON.stringify(doc)).join("\n")}\n`;

await mkdir(dirname(target), { recursive: true });
await writeFile(target, ndjson, "utf8");

console.log(`Wrote ${documents.length} documents to seed/content.ndjson`);
console.log("");
console.log("Import them into your dataset with:");
console.log("  bunx sanity dataset import seed/content.ndjson production");
console.log("");
console.log("Add --replace to overwrite documents that already exist.");
