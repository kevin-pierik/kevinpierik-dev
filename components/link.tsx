import { cva } from "class-variance-authority";

export const linkVariants = cva(
  "underline underline-offset-2 hover:decoration-dashed focus-visible:outline-2 focus-visible:outline-ring",
  {
    variants: {
      variant: {
        default: "focus-visible:outline-offset-2",
        inset: "hover:text-paper focus-visible:outline-offset-[-2px]",
      },
    },
    defaultVariants: { variant: "default" },
  },
);
