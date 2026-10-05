import * as React from "react"
import { XIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

/**
 * FilterChip — a removable "Kind: value" chip for an applied filter. Use
 * Badge for static labels and Toggle for on/off choices; see THEMING.md.
 *
 *   <FilterChip kind="Topic" value="Water levels" onRemove={…} />
 */
function FilterChip({
  kind,
  value,
  onRemove,
  className,
  ...props
}: Omit<React.ComponentProps<"span">, "children"> & {
  kind?: string
  value: string
  onRemove: () => void
}) {
  return (
    <span
      data-slot="filter-chip"
      className={cn(
        "inline-flex h-7 items-center gap-1.5 rounded-full border border-primary/30 bg-accent pr-0.5 pl-2.5 text-sm text-accent-foreground",
        className
      )}
      {...props}
    >
      {kind && <span className="text-muted-foreground">{kind}:</span>}
      <span className="font-semibold">{value}</span>
      <Button
        type="button"
        variant="ghost"
        size="icon-xs"
        className="rounded-full"
        onClick={onRemove}
        aria-label={`Remove filter ${kind ? `${kind}: ` : ""}${value}`}
      >
        <XIcon aria-hidden />
      </Button>
    </span>
  )
}

/**
 * ActiveFilterBar — "Filtered by" plus the applied FilterChips and a
 * trailing "Clear all". Render it only while filters are applied.
 */
function ActiveFilterBar({
  onClearAll,
  label = "Filtered by",
  clearLabel = "Clear all",
  className,
  children,
  ...props
}: React.ComponentProps<"div"> & {
  onClearAll: () => void
  label?: React.ReactNode
  clearLabel?: React.ReactNode
}) {
  const labelId = React.useId()
  return (
    <div
      data-slot="active-filter-bar"
      role="group"
      aria-labelledby={labelId}
      className={cn("flex flex-wrap items-center gap-1.5", className)}
      {...props}
    >
      <span id={labelId} className="mr-1 text-sm text-muted-foreground">
        {label}
      </span>
      {children}
      <Button
        type="button"
        variant="link"
        size="xs"
        className="ml-auto"
        onClick={onClearAll}
      >
        {clearLabel}
      </Button>
    </div>
  )
}

export { FilterChip, ActiveFilterBar }
