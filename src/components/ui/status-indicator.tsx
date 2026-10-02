import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const dotVariants = cva("size-2 shrink-0 rounded-full", {
  variants: {
    status: {
      online: "bg-success",
      degraded: "bg-warning",
      offline: "bg-muted-foreground",
      error: "bg-destructive",
      info: "bg-info",
      pending: "bg-primary",
    },
  },
  defaultVariants: { status: "offline" },
})

export interface StatusIndicatorProps
  extends React.ComponentProps<"span">,
    VariantProps<typeof dotVariants> {
  /** Animate the dot with a ping (for in-progress / live states). */
  pulse?: boolean
}

/**
 * StatusIndicator — a colored dot plus optional label for resource health
 * (online / degraded / offline / error / info / pending). Pass a label as
 * children; omit for a bare dot.
 *
 *   <StatusIndicator status="online">online</StatusIndicator>
 */
function StatusIndicator({
  className,
  status,
  pulse = false,
  children,
  ...props
}: StatusIndicatorProps) {
  return (
    <span
      data-slot="status-indicator"
      data-status={status ?? "offline"}
      className={cn(
        "inline-flex items-center gap-1.5 text-sm text-foreground",
        className
      )}
      {...props}
    >
      <span className="relative flex size-2 items-center justify-center">
        {pulse && (
          <span
            className={cn(
              dotVariants({ status }),
              "absolute inline-flex animate-ping opacity-75"
            )}
          />
        )}
        <span className={cn(dotVariants({ status }), "relative")} />
      </span>
      {children}
    </span>
  )
}

export { StatusIndicator, dotVariants }
