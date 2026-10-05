import * as React from "react"

import { cn } from "@/lib/utils"

// Columns per stat count, chosen by the band's own width (container query)
// so a row never ends half-empty: 4 → 4 / 2×2 / 1, 3 → 3 / 1, 2 → 2 / 1.
const COLUMNS: Record<number, string> = {
  1: "grid-cols-1",
  2: "grid-cols-1 @[460px]:grid-cols-2",
  3: "grid-cols-1 @[700px]:grid-cols-3",
  4: "grid-cols-1 @[460px]:grid-cols-2 @[1000px]:grid-cols-4",
}

/**
 * StatBand — a row of big-number stats with hairline dividers (the border
 * color showing through a 1px gap). Holds up to four Stats.
 *
 *   <StatBand>
 *     <Stat value="5,213" label="Monitoring wells" />
 *   </StatBand>
 */
function StatBand({ className, children, ...props }: React.ComponentProps<"div">) {
  const count = React.Children.toArray(children).length
  return (
    <div
      data-slot="stat-band"
      className={cn("@container", className)}
      {...props}
    >
      <dl
        className={cn(
          "grid gap-px overflow-hidden rounded-xl border bg-border",
          COLUMNS[count] ?? COLUMNS[4]
        )}
      >
        {children}
      </dl>
    </div>
  )
}

/** One stat. The value renders above the label; the DOM keeps dt before dd. */
function Stat({
  value,
  label,
  className,
  ...props
}: Omit<React.ComponentProps<"div">, "children"> & {
  value: React.ReactNode
  label: React.ReactNode
}) {
  return (
    <div
      data-slot="stat"
      className={cn("flex flex-col-reverse bg-card px-6 py-6 @[700px]:px-8", className)}
      {...props}
    >
      <dt className="mt-1.5 text-sm text-muted-foreground">{label}</dt>
      <dd className="font-heading text-4xl leading-none font-bold text-primary tabular-nums @[460px]:text-5xl">
        {value}
      </dd>
    </div>
  )
}

export { StatBand, Stat }
