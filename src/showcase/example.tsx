import * as React from "react"

import { cn } from "@/lib/utils"

/**
 * A labeled showcase example. The label names the props or state shown, in
 * code form (e.g. `variant="outline"`), so reviewers can tell examples apart.
 */
export function Example({
  label,
  className,
  children,
}: {
  label: React.ReactNode
  className?: string
  children: React.ReactNode
}) {
  return (
    <div className={cn("flex flex-col items-start gap-1.5", className)}>
      <div className="font-mono text-xs text-muted-foreground">{label}</div>
      {children}
    </div>
  )
}

/** A titled row of examples within a section. */
export function ExampleGroup({
  title,
  className,
  children,
}: {
  title: string
  className?: string
  children: React.ReactNode
}) {
  return (
    <div className="space-y-2">
      <h4 className="!text-sm !font-semibold text-muted-foreground uppercase tracking-wide">
        {title}
      </h4>
      <div className={cn("flex flex-wrap items-end gap-x-6 gap-y-4", className)}>
        {children}
      </div>
    </div>
  )
}
