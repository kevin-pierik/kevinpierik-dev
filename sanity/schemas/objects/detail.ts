import { defineField, defineType } from "sanity";

export const detail = defineType({
  name: "detail",
  title: "Detail",
  type: "object",
  description: "One row in the metadata table above a document.",
  fields: [
    defineField({
      name: "label",
      title: "Label",
      type: "string",
      description: "Rendered in brackets and uppercased, like [AUTHOR].",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "value",
      title: "Value",
      type: "string",
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: { title: "label", subtitle: "value" },
  },
});
