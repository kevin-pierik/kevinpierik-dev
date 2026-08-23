import { defineArrayMember, defineField, defineType } from "sanity";

export const linkRow = defineType({
  name: "linkRow",
  title: "Link row",
  type: "object",
  description: "A row of small links, like Email · LinkedIn · PDF resume.",
  fields: [
    defineField({
      name: "links",
      title: "Links",
      type: "array",
      of: [defineArrayMember({ type: "labelledLink" })],
      validation: (rule) => rule.required().min(1),
    }),
  ],
  preview: {
    select: { links: "links" },
    prepare: ({ links }) => ({
      title: (links ?? [])
        .map((link: { label?: string }) => link?.label)
        .filter(Boolean)
        .join("  ·  "),
      subtitle: `Link row · ${(links ?? []).length} links`,
    }),
  },
});
