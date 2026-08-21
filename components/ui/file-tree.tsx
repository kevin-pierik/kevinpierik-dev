"use client"

import { Folder, FolderOpen } from "lucide-react"
import { cva, type VariantProps } from "class-variance-authority"
import { cloneElement, isValidElement, type ComponentProps } from "react"

import { Button } from "@/components/ui/button"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { cn } from "@/features/style/utils"

const fileTreeItemVariants = cva(
  "inline-flex w-full items-center justify-start gap-1.5 rounded-none font-mono text-[11px] font-normal text-mist transition-colors hover:text-paper focus-visible:outline-2 focus-visible:outline-ring",
  {
    variants: {
      variant: {
        file: "min-h-6 px-1 hover:bg-transparent focus-visible:outline-offset-2",
        folder:
          "min-h-7 px-2 hover:bg-paper/8 focus-visible:outline-offset-[-2px] data-[active=true]:bg-paper/10 data-[active=true]:text-paper",
        link: "w-auto min-h-6 px-0 underline underline-offset-2 hover:bg-transparent hover:decoration-dashed focus-visible:outline-offset-2",
      },
    },
    defaultVariants: {
      variant: "file",
    },
  }
)

function FileTree({ className, ...props }: ComponentProps<"ul">) {
  return (
    <ul
      data-slot="file-tree"
      className={cn("flex flex-col items-start gap-0.5", className)}
      {...props}
    />
  )
}

function FileTreeFile({
  className,
  variant = "file",
  active = false,
  render,
  ...props
}: Omit<ComponentProps<typeof Button>, "variant" | "size"> &
  VariantProps<typeof fileTreeItemVariants> & {
    active?: boolean
  }) {
  const itemClassName = cn(fileTreeItemVariants({ variant }), className)

  return (
    <li
      data-slot="file-tree-file"
      className={cn(variant === "folder" && "w-full border-b border-paper/20")}
    >
      {isValidElement<{
        className?: string
        "aria-current"?: "page"
        "data-active"?: string
        children?: React.ReactNode
      }>(render) ? (
        cloneElement(render, {
          className: itemClassName,
          "aria-current": active ? "page" : undefined,
          "data-active": active ? "true" : undefined,
          children: props.children,
        })
      ) : (
        <Button
          variant="desk"
          size="none"
          aria-pressed={active}
          data-active={active ? "true" : undefined}
          className={itemClassName}
          {...props}
        />
      )}
    </li>
  )
}

function FileTreeFolder({
  name,
  className,
  contentClassName,
  defaultOpen = false,
  open,
  onOpenChange,
  children,
  ...props
}: ComponentProps<typeof Collapsible> & {
  name: string
  contentClassName?: string
}) {
  return (
    <li data-slot="file-tree-folder" className="w-full">
      <Collapsible
        defaultOpen={defaultOpen}
        open={open}
        onOpenChange={onOpenChange}
        className={cn("group/file-tree-folder w-full", className)}
        {...props}
      >
        <CollapsibleTrigger
          render={
            <Button
              variant="desk"
              size="none"
              className={fileTreeItemVariants({ variant: "folder" })}
            />
          }
        >
          <Folder
            aria-hidden
            className="size-3 group-data-open/file-tree-folder:hidden"
          />
          <FolderOpen
            aria-hidden
            className="hidden size-3 group-data-open/file-tree-folder:block"
          />
          {name}
        </CollapsibleTrigger>
        <CollapsibleContent>
          <ul
            data-slot="file-tree-folder-content"
            className={cn("flex flex-col", contentClassName)}
          >
            {children}
          </ul>
        </CollapsibleContent>
      </Collapsible>
    </li>
  )
}

export { FileTree, FileTreeFile, FileTreeFolder, fileTreeItemVariants }
