import { defineField, defineType } from "sanity";

export const codeBlock = defineType({
  name: "codeBlock",
  title: "Code",
  type: "object",
  fields: [
    defineField({
      name: "language",
      title: "Language",
      type: "string",
      initialValue: "text",
      options: {
        list: [
          { title: "Plain text", value: "text" },
          { title: "TypeScript", value: "ts" },
          { title: "TSX", value: "tsx" },
          { title: "JavaScript", value: "js" },
          { title: "CSS", value: "css" },
          { title: "HTML", value: "html" },
          { title: "JSON", value: "json" },
          { title: "Shell", value: "bash" },
          { title: "GROQ", value: "groq" },
        ],
      },
    }),
    defineField({
      name: "code",
      title: "Code",
      type: "text",
      rows: 10,
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: { subtitle: "language", title: "code" },
  },
});
