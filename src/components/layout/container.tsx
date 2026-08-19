import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";

function Container({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="container"
      className={cn("w-full px-6 lg:px-30", className)}
      {...props}
    />
  );
}

export { Container };
