import { DocumentIcon } from "@sanity/icons/Document";
import { DocumentsIcon } from "@sanity/icons/Documents";
import { FolderIcon } from "@sanity/icons/Folder";
import { defineField, defineType } from "sanity";

import { contentGroups } from "../fields/content-groups";
import { createOrderField } from "../fields/create-order-field";
import { createSeoField } from "../fields/create-seo-field";
import { createSlugField } from "../fields/create-slug-field";

const placements = [
  { title: "File on the home desktop", value: "home" },
  { title: "Folder under Works", value: "project" },
  { title: "Standalone page", value: "standalone" },
] as const;

const placementIcons = {
  home: DocumentIcon,
  project: FolderIcon,
  standalone: DocumentsIcon,
} as const;

const isWindow = (placement?: string) => placement === "home";

const isDocument = (placement?: string) =>
  placement === "project" || placement === "standalone";

export const desktopWindow = defineType({
  name: "desktopWindow",
  title: "Window",
  type: "document",
  icon: DocumentIcon,
  groups: contentGroups,
  fields: [
    defineField({
      name: "label",
      title: "Label",
      type: "string",
      group: "content",
      description: "The text next to the file or folder icon.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "title",
      title: "Window title",
      type: "string",
      group: "content",
      description: "Shown in the title bar of the window.",
      validation: (rule) => rule.required(),
    }),
    { ...createSlugField("label"), group: "content" },
    defineField({
      name: "placement",
      title: "Placement",
      type: "string",
      group: "content",
      initialValue: "home",
      options: { list: [...placements], layout: "radio" },
      validation: (rule) => rule.required(),
    }),
    { ...createOrderField(), group: "content" },
    defineField({
      name: "text",
      title: "Text",
      type: "windowText",
      group: "content",
      description:
        "Short text for a small window. Paragraphs and links only, on purpose.",
      hidden: ({ parent }) => !isWindow(parent?.placement),
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "articleText",
      group: "content",
      description:
        "Full article text: headings, lists, images and code. Used by folders and standalone pages.",
      hidden: ({ parent }) => !isDocument(parent?.placement),
    }),
    defineField({
      name: "cover",
      title: "Cover image",
      type: "image",
      group: "content",
      options: { hotspot: true },
      description:
        "Shown as the tile in the left panel. Without one the entry falls back to a text row.",
      hidden: ({ parent }) => parent?.placement !== "project",
      fields: [
        defineField({
          name: "alt",
          title: "Alternative text",
          type: "string",
          validation: (rule) => rule.required(),
        }),
      ],
    }),
    defineField({
      name: "details",
      title: "Metadata rows",
      type: "array",
      group: "content",
      of: [{ type: "detail" }],
      description: "Rendered as a table above the document.",
      hidden: ({ parent }) => !isDocument(parent?.placement),
    }),
    defineField({
      name: "file",
      title: "PDF",
      type: "file",
      group: "content",
      options: { accept: "application/pdf" },
      description: "When set, the window embeds this PDF instead of the body.",
      hidden: ({ parent }) => !isDocument(parent?.placement),
    }),
    createSeoField(),
  ],
  orderings: [
    {
      title: "Placement, then order",
      name: "placementOrder",
      by: [
        { field: "placement", direction: "asc" },
        { field: "order", direction: "asc" },
      ],
    },
  ],
  preview: {
    select: { title: "label", placement: "placement", slug: "slug.current" },
    prepare({ title, placement, slug }) {
      const match = placements.find((item) => item.value === placement);

      return {
        title,
        subtitle: [match?.title, slug && `/${slug}`].filter(Boolean).join(" — "),
        media:
          placementIcons[placement as keyof typeof placementIcons] ?? DocumentIcon,
      };
    },
  },
});
