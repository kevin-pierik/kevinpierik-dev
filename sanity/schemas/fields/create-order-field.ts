import { defineField } from "sanity";

export const createOrderField = () =>
  defineField({
    name: "order",
    title: "Order",
    type: "number",
    description: "Lower numbers come first.",
    initialValue: 100,
    validation: (rule) => rule.required().integer().min(0),
  });
