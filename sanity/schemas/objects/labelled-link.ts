import { defineField, defineType } from "sanity";

const hrefPattern = /^(https?:\/\/|mailto:|tel:|\/)/;

export const labelledLink = defineType({
  name: "labelledLink",
  title: "Link",
  type: "object",
  fields: [
    defineField({
      name: "label",
      title: "Label",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "href",
      title: "URL",
      type: "string",
      description:
        "An absolute URL (https://…), a mailto:/tel: address, or a path on this site (/extra).",
      validation: (rule) =>
        rule.required().regex(hrefPattern, {
          name: "URL, mailto:, tel: or a path starting with /",
        }),
    }),
  ],
  preview: {
    select: { title: "label", subtitle: "href" },
  },
});
