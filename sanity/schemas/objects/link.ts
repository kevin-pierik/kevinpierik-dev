import { defineField, defineType } from "sanity";

const hrefPattern = /^(https?:\/\/|mailto:|tel:|\/)/;

export const link = defineType({
  name: "link",
  title: "Link",
  type: "object",
  fields: [
    defineField({
      name: "href",
      title: "URL",
      type: "string",
      description:
        "An absolute URL (https://…), a mailto:/tel: address, or a path on this site (/extra).",
      validation: (rule) =>
        rule
          .required()
          .regex(hrefPattern, {
            name: "URL, mailto:, tel: or a path starting with /",
          }),
    }),
    defineField({
      name: "openInNewTab",
      title: "Open in a new tab",
      type: "boolean",
      initialValue: false,
    }),
  ],
});
