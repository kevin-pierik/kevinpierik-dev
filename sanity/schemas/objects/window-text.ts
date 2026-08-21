import { defineArrayMember, defineType } from "sanity";

export const windowText = defineType({
  name: "windowText",
  title: "Window text",
  type: "array",
  of: [
    defineArrayMember({
      type: "block",
      styles: [{ title: "Paragraph", value: "normal" }],
      lists: [],
      marks: {
        decorators: [
          { title: "Bold", value: "strong" },
          { title: "Italic", value: "em" },
        ],
        annotations: [{ type: "link" }],
      },
    }),
  ],
});
