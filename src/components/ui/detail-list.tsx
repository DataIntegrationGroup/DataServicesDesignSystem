import * as React from "react"

import { cn } from "@/lib/utils"

/**
 * DetailSection — a titled group inside a detail panel or card: an eyebrow
 * heading over its content. `headingLevel` sets the heading element so it
 * fits the page outline (default h3).
 */
function DetailSection({
  title,
  headingLevel: Heading = "h3",
  className,
  children,
  ...props
}: React.ComponentProps<"section"> & {
  title: React.ReactNode
  headingLevel?: "h2" | "h3" | "h4"
}) {
  return (
    <section data-slot="detail-section" className={cn("space-y-1.5", className)} {...props}>
      {/* font-sans overrides the base heading font so it matches other eyebrows. */}
      <Heading className="font-sans text-eyebrow text-muted-foreground uppercase">
        {title}
      </Heading>
      {children}
    </section>
  )
}

/**
 * DetailList — label/value pairs: muted labels, regular values, side by side
 * from the sm breakpoint and stacked below it.
 *
 *   <DetailList>
 *     <DetailItem label="Well depth">312.5 ft</DetailItem>
 *   </DetailList>
 */
function DetailList({ className, ...props }: React.ComponentProps<"dl">) {
  return (
    <dl
      data-slot="detail-list"
      className={cn(
        "grid grid-cols-1 gap-x-4 gap-y-1.5 text-sm sm:grid-cols-[minmax(9rem,0.8fr)_1.2fr]",
        className
      )}
      {...props}
    />
  )
}

function DetailItem({
  label,
  className,
  children,
  ...props
}: React.ComponentProps<"div"> & { label: React.ReactNode }) {
  return (
    <div
      data-slot="detail-item"
      className={cn("col-span-full grid grid-cols-subgrid", className)}
      {...props}
    >
      <dt className="text-muted-foreground">{label}</dt>
      <dd>{children}</dd>
    </div>
  )
}

export { DetailSection, DetailList, DetailItem }
