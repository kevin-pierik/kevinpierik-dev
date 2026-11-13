import { Button as ButtonPrimitive } from "@ui-sdk/react/button";
import type { ComponentProps } from "react";

type ButtonVariant = "primary" | "solid" | "outline";

const baseClassName =
  "inline-flex min-h-10 items-center justify-center gap-[1ch] rounded-none px-4 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring data-disabled:cursor-not-allowed data-disabled:opacity-50";

const variantClassNames: Record<ButtonVariant, string> = {
  primary: "bg-primary text-primary-foreground hover:bg-primary-hover",
  solid: "bg-foreground text-background hover:bg-foreground/85",
  outline:
    "border border-foreground bg-background text-foreground hover:bg-foreground/[0.06]",
};

export function buttonClassName(variant: ButtonVariant = "solid") {
  return `${baseClassName} ${variantClassNames[variant]}`;
}

type ButtonProps = Omit<ComponentProps<typeof ButtonPrimitive>, "className"> & {
  variant?: ButtonVariant;
  className?: string;
};

export function Button({ variant, className, ...props }: ButtonProps) {
  return (
    <ButtonPrimitive
      className={[buttonClassName(variant), className]
        .filter(Boolean)
        .join(" ")}
      {...props}
    />
  );
}
