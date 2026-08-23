import { defineArrayMember, defineField, defineType } from "sanity";

export const entryList = defineType({
  name: "entryList",
  title: "Entry list",
  type: "object",
  description:
    "A titled list of rows, like Work with a year, a company and a role.",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      description: "Shown above the list, for example Work or Published.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "entries",
      title: "Entries",
      type: "array",
      validation: (rule) => rule.required().min(1),
      of: [
        defineArrayMember({
          type: "object",
          name: "entry",
          fields: [
            defineField({
              name: "meta",
              title: "Meta",
              type: "string",
              description: "The left-hand value, usually a year.",
            }),
            defineField({
              name: "title",
              title: "Title",
              type: "string",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "description",
              title: "Description",
              type: "string",
            }),
            defineField({
              name: "href",
              title: "Link",
              type: "string",
              description: "Optional. Makes the title clickable.",
            }),
          ],
          preview: {
            select: { title: "title", meta: "meta", description: "description" },
            prepare: ({ title, meta, description }) => ({
              title: [meta, title].filter(Boolean).join("  "),
              subtitle: description,
            }),
          },
        }),
      ],
    }),
  ],
  preview: {
    select: { title: "title", entries: "entries" },
    prepare: ({ title, entries }) => ({
      title,
      subtitle: `Entry list · ${(entries ?? []).length} entries`,
    }),
  },
});
