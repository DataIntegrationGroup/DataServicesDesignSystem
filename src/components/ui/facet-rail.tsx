import * as React from "react"
import { Accordion as AccordionPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

type FacetOption = {
  value: string
  label: React.ReactNode
  count?: number
}

/**
 * FacetCheckboxes — one filter facet as a checkbox list: a fieldset whose
 * legend names the facet, and a Checkbox + Label per option with its result
 * count. Nothing checked means no filter. Inside a FacetRailItem, whose
 * trigger already names the facet, set `legendHidden` to keep the legend
 * for screen readers only.
 */
function FacetCheckboxes({
  legend,
  options,
  checked,
  onToggle,
  legendHidden = false,
  countLabel = "results",
  className,
  ...props
}: Omit<React.ComponentProps<"fieldset">, "children" | "onToggle"> & {
  legend: React.ReactNode
  options: FacetOption[]
  checked: string[]
  onToggle: (value: string) => void
  legendHidden?: boolean
  /** Read after each count by screen readers, e.g. "datasets". */
  countLabel?: string
}) {
  const id = React.useId()
  return (
    <fieldset
      data-slot="facet-checkboxes"
      className={cn("min-w-0", className)}
      {...props}
    >
      <legend
        className={cn(
          "px-3 pb-2 text-eyebrow text-muted-foreground uppercase",
          legendHidden && "sr-only"
        )}
      >
        {legend}
      </legend>
      <div className="flex flex-col gap-0.5">
        {options.map((option) => {
          const optionId = `${id}-${option.value}`
          return (
            <div
              key={option.value}
              data-slot="facet-option"
              className="flex items-center gap-2.5 rounded-lg px-3 py-2 hover:bg-accent has-data-checked:bg-accent/60"
            >
              <Checkbox
                id={optionId}
                checked={checked.includes(option.value)}
                onCheckedChange={() => onToggle(option.value)}
              />
              <Label
                htmlFor={optionId}
                className="flex flex-1 cursor-pointer justify-between gap-3 leading-snug font-normal"
              >
                <span>{option.label}</span>
                {option.count !== undefined && (
                  <span className="text-muted-foreground tabular-nums">
                    {option.count}
                    <span className="sr-only"> {countLabel}</span>
                  </span>
                )}
              </Label>
            </div>
          )
        })}
      </div>
    </fieldset>
  )
}

/**
 * FacetRail — a card of collapsible filter facets. Each FacetRailItem's
 * trigger shows the facet name and "N selected".
 *
 *   <FacetRail defaultValue={["topic"]}>
 *     <FacetRailItem value="topic" title="Topic" selectedCount={checked.length}>
 *       <FacetCheckboxes legend="Topic" legendHidden … />
 *     </FacetRailItem>
 *   </FacetRail>
 */
function FacetRail({
  className,
  ...props
}: Omit<AccordionPrimitive.AccordionMultipleProps, "type">) {
  return (
    <Accordion
      data-slot="facet-rail"
      type="multiple"
      className={cn("rounded-xl border bg-card px-4", className)}
      {...props}
    />
  )
}

function FacetRailItem({
  title,
  selectedCount = 0,
  children,
  ...props
}: React.ComponentProps<typeof AccordionItem> & {
  title: React.ReactNode
  selectedCount?: number
}) {
  return (
    <AccordionItem data-slot="facet-rail-item" {...props}>
      <AccordionTrigger variant="plain" className="py-3">
        <span className="flex flex-1 items-baseline justify-between gap-3 pr-3">
          {title}
          {selectedCount > 0 && (
            <span className="text-xs font-normal text-muted-foreground">
              {selectedCount} selected
            </span>
          )}
        </span>
      </AccordionTrigger>
      <AccordionContent className="-mx-3 pb-3">{children}</AccordionContent>
    </AccordionItem>
  )
}

export { FacetCheckboxes, FacetRail, FacetRailItem, type FacetOption }
