import { CogIcon } from "@sanity/icons/Cog";
import { defineField, defineType } from "sanity";

export const SETTINGS_ID = "siteSettings";

export const settings = defineType({
  name: "settings",
  title: "Site settings",
  type: "document",
  icon: CogIcon,
  groups: [
    { name: "identity", title: "Identity", default: true },
    { name: "navigation", title: "Navigation" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      group: "identity",
      description: "Shown in the header and used as the author of the site.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "email",
      title: "Email",
      type: "string",
      group: "identity",
      validation: (rule) => rule.required().email(),
    }),
    defineField({
      name: "version",
      title: "Version",
      type: "string",
      group: "identity",
      description: "Cosmetic build label, like v1.0.0.",
    }),
    defineField({
      name: "footerNote",
      title: "Footer note",
      type: "string",
      group: "identity",
      description:
        "One short line shown above the copyright in the sidebar of Extra and Blog. Leave empty to hide it.",
      validation: (rule) => rule.max(80),
    }),
    defineField({
      name: "social",
      title: "Social links",
      type: "array",
      group: "identity",
      of: [{ type: "labelledLink" }],
    }),
    defineField({
      name: "navigation",
      title: "Header navigation",
      type: "array",
      group: "navigation",
      of: [{ type: "labelledLink" }],
      description: "The links in the top right of every screen, in order.",
    }),
    defineField({
      name: "title",
      title: "Default meta title",
      type: "string",
      group: "seo",
      description: "Used on the home page and as the fallback for every other page.",
      validation: (rule) => rule.required().max(60),
    }),
    defineField({
      name: "description",
      title: "Default meta description",
      type: "text",
      rows: 3,
      group: "seo",
      validation: (rule) => rule.required().max(160),
    }),
  ],
  preview: {
    prepare: () => ({ title: "Site settings" }),
  },
});
