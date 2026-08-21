import { defineField, defineType } from "sanity";

export const seo = defineType({
  name: "seo",
  title: "SEO",
  type: "object",
  fields: [
    defineField({
      name: "metaTitle",
      title: "Meta title",
      type: "string",
      description:
        "Overrides the title used in the browser tab, search results and social cards. Keep it under 60 characters.",
      validation: (rule) => rule.max(60),
    }),
    defineField({
      name: "metaDescription",
      title: "Meta description",
      type: "text",
      rows: 3,
      description: "Shown in search results. Aim for 110 to 155 characters.",
      validation: (rule) => rule.max(160),
    }),
    defineField({
      name: "noIndex",
      title: "Hide from search engines",
      type: "boolean",
      description: "Adds a noindex robots tag and keeps the page out of the sitemap.",
      initialValue: false,
    }),
  ],
});
