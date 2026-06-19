import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const dotVariants = cva("size-2 shrink-0 rounded-full", {
  variants: {
    status: {
      online: "bg-emerald-600 dark:bg-emerald-400",
      degraded: "bg-amber-500 dark:bg-amber-400",
      offline: "bg-slate-400 dark:bg-slate-500",
      error: "bg-red-600 dark:bg-red-400",
      info: "bg-cyan-600 dark:bg-cyan-400",
      pending: "bg-blue-500 dark:bg-blue-400",
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
