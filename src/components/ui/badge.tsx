import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "group/badge inline-flex h-5 w-fit shrink-0 items-center justify-center gap-1 overflow-hidden rounded-4xl border border-transparent px-2 py-0.5 text-xs font-medium whitespace-nowrap transition-all focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&>svg]:pointer-events-none [&>svg]:size-3!",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground [a]:hover:bg-primary/80",
        secondary:
          "bg-secondary text-secondary-foreground [a]:hover:bg-secondary/80",
        destructive:
          "bg-destructive/10 text-destructive focus-visible:ring-destructive/20 dark:bg-destructive/20 dark:focus-visible:ring-destructive/40 [a]:hover:bg-destructive/20",
        outline:
          "border-border text-foreground [a]:hover:bg-muted [a]:hover:text-muted-foreground",
        ghost:
          "hover:bg-muted hover:text-muted-foreground dark:hover:bg-muted/50",
        link: "text-primary underline-offset-4 hover:underline",
        success: "bg-success-soft text-success-strong [a]:hover:bg-success-soft/80",
        warning: "bg-warning-soft text-warning-strong [a]:hover:bg-warning-soft/80",
        info: "bg-info-soft text-info-strong [a]:hover:bg-info-soft/80",
        "tone-1": "bg-tone-1-soft text-tone-1-strong [a]:hover:bg-tone-1-soft/80",
        "tone-2": "bg-tone-2-soft text-tone-2-strong [a]:hover:bg-tone-2-soft/80",
        "tone-3": "bg-tone-3-soft text-tone-3-strong [a]:hover:bg-tone-3-soft/80",
        "tone-4": "bg-tone-4-soft text-tone-4-strong [a]:hover:bg-tone-4-soft/80",
        "tone-5": "bg-tone-5-soft text-tone-5-strong [a]:hover:bg-tone-5-soft/80",
        "tone-6": "bg-tone-6-soft text-tone-6-strong [a]:hover:bg-tone-6-soft/80",
        "on-image":
          "border-on-image-border text-on-image focus-visible:border-on-image-ring focus-visible:ring-on-image-ring/50 [a]:hover:bg-on-image-surface [button]:hover:bg-on-image-surface",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Badge({
  className,
  variant = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot.Root : "span"

  return (
    <Comp
      data-slot="badge"
      data-variant={variant}
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  )
}

export { Badge, badgeVariants }
