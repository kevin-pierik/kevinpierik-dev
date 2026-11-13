import { Button as ButtonPrimitive } from "@ui-sdk/react/button";
import type { ComponentProps } from "react";

type ButtonVariant = "primary" | "solid" | "outline" | "subtle";
type ButtonSize = "sm" | "md";

const baseClassName =
  "inline-flex items-center justify-center gap-[1ch] rounded-none transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring data-disabled:cursor-not-allowed data-disabled:opacity-50";

const variantClassNames: Record<ButtonVariant, string> = {
  primary: "bg-primary text-primary-foreground hover:bg-primary-hover",
  solid: "bg-foreground text-background hover:bg-foreground/85",
  outline:
    "border border-foreground bg-background text-foreground hover:bg-foreground/[0.06]",
  subtle: "bg-subtle text-foreground hover:bg-subtle-hover",
};

const sizeClassNames: Record<ButtonSize, string> = {
  sm: "min-h-8 px-3",
  md: "min-h-10 px-4",
};

export type { ButtonSize, ButtonVariant };

export function buttonClassName(
  variant: ButtonVariant = "solid",
  size: ButtonSize = "md",
) {
  return `${baseClassName} ${variantClassNames[variant]} ${sizeClassNames[size]}`;
}

type ButtonProps = Omit<ComponentProps<typeof ButtonPrimitive>, "className"> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
};

export function Button({ variant, size, className, ...props }: ButtonProps) {
  return (
    <ButtonPrimitive
      className={[buttonClassName(variant, size), className]
        .filter(Boolean)
        .join(" ")}
      {...props}
    />
  );
}
