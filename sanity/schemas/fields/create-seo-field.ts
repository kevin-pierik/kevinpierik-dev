import { defineField } from "sanity";

export const createSeoField = () =>
  defineField({
    name: "seo",
    title: "SEO",
    type: "seo",
    group: "seo",
    options: { collapsible: true, collapsed: true },
  });
