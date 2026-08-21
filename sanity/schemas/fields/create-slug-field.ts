import { defineField } from "sanity";

export const createSlugField = (source: string) =>
  defineField({
    name: "slug",
    title: "Slug",
    type: "slug",
    description: "Used in the URL. Change it and existing links break.",
    options: { source, maxLength: 96 },
    validation: (rule) => rule.required(),
  });
