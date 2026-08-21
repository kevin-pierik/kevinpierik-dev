import { DocumentTextIcon } from "@sanity/icons/DocumentText";
import { defineField, defineType } from "sanity";

import { contentGroups } from "../fields/content-groups";
import { createSeoField } from "../fields/create-seo-field";
import { createSlugField } from "../fields/create-slug-field";

export const post = defineType({
  name: "post",
  title: "Post",
  type: "document",
  icon: DocumentTextIcon,
  groups: contentGroups,
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      group: "content",
      validation: (rule) => rule.required(),
    }),
    { ...createSlugField("title"), group: "content" },
    defineField({
      name: "publishedAt",
      title: "Published at",
      type: "datetime",
      group: "content",
      initialValue: () => new Date().toISOString(),
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "excerpt",
      title: "Excerpt",
      type: "text",
      rows: 3,
      group: "content",
      description:
        "One or two sentences. Used in the folder list, the metadata table and as the fallback meta description.",
      validation: (rule) => rule.required().max(240),
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "articleText",
      group: "content",
    }),
    createSeoField(),
  ],
  orderings: [
    {
      title: "Newest first",
      name: "publishedAtDesc",
      by: [{ field: "publishedAt", direction: "desc" }],
    },
  ],
  preview: {
    select: { title: "title", subtitle: "excerpt", date: "publishedAt" },
    prepare({ title, date }) {
      return {
        title,
        subtitle: date ? new Date(date).toISOString().slice(0, 10) : "No date",
      };
    },
  },
});
