import * as React from "react"

import { cn } from "@/lib/utils"
import { Separator } from "@/components/ui/separator"
import { Example, ExampleGroup } from "@/showcase/example"

/** Reads an element's rendered font size, line height and weight, so labels
 *  show what the CSS actually produces rather than hand-typed values. */
function useMeasuredType() {
  const [measured, setMeasured] = React.useState("")
  const ref = React.useCallback((el: HTMLElement | null) => {
    if (!el) return
    const cs = getComputedStyle(el)
    const px = (v: string) => `${Math.round(parseFloat(v) * 10) / 10}px`
    const lh = cs.lineHeight === "normal" ? "normal" : px(cs.lineHeight)
    setMeasured(`${px(cs.fontSize)} / ${lh} · ${cs.fontWeight}`)
  }, [])
  return [ref, measured] as const
}

/** One specimen: the element, labeled with its classes and measured type. */
function Specimen({
  as: Tag = "p",
  label,
  className,
  children,
}: {
  as?: React.ElementType
  label: string
  className?: string
  children: React.ReactNode
}) {
  const [ref, measured] = useMeasuredType()
  return (
    <Example
      label={
        <>
          {label}
          {measured && <span> · {measured}</span>}
        </>
      }
      className="items-stretch"
    >
      <Tag ref={ref} className={className}>
        {children}
      </Tag>
    </Example>
  )
}

const SAMPLE = "Groundwater levels across New Mexico"
const PARAGRAPH =
  "Find groundwater levels, water quality and well records from agencies across the state, in one place. Every dataset links back to its source."

const SIZES = [
  "text-xs",
  "text-sm",
  "text-base",
  "text-lg",
  "text-xl",
  "text-2xl",
  "text-3xl",
  "text-4xl",
  "text-5xl",
  "text-6xl",
] as const

const WEIGHTS = [
  "font-light",
  "font-normal",
  "font-medium",
  "font-semibold",
  "font-bold",
  "font-extrabold",
] as const

const COLORS = [
  "text-foreground",
  "text-muted-foreground",
  "text-primary",
  "text-secondary-strong",
  "text-destructive",
  "text-success-strong",
  "text-warning-strong",
  "text-info-strong",
] as const

export function TypographyShowcase() {
  return (
    <div className="space-y-10">
      <section className="space-y-6">
        <h2>Headings</h2>
        <p className="text-muted-foreground">
          <code>theme-base</code> sets only the heading font
          (<code>--font-heading</code>); size, weight and color come from
          utilities, so a heading inherits its container&apos;s color. The
          sizes below are the showcase&apos;s own.
        </p>
        <div className="space-y-5">
          <Specimen as="h1" label="<h1>">
            Heading 1
          </Specimen>
          <Specimen as="h2" label="<h2>">
            Heading 2
          </Specimen>
          <Specimen as="h3" label="<h3>">
            Heading 3
          </Specimen>
          <Specimen as="h4" label="<h4>">
            Heading 4
          </Specimen>
          <Specimen as="h5" label="<h5>">
            Heading 5
          </Specimen>
          <Specimen as="h6" label="<h6>">
            Heading 6
          </Specimen>
          <Specimen label="<p> (body)">{PARAGRAPH}</Specimen>
        </div>
      </section>

      <Separator />

      <section className="space-y-6">
        <h2>Type steps</h2>
        <p className="text-muted-foreground">
          The DS's named steps for sizes the standard scale doesn't cover. See
          THEMING.md.
        </p>
        <div className="space-y-5">
          <Specimen label="text-display font-heading" className="text-display font-heading">
            Water data
          </Specimen>
          <Specimen
            label="text-eyebrow uppercase text-primary"
            className="text-eyebrow uppercase text-primary"
          >
            Datasets
          </Specimen>
        </div>
      </section>

      <Separator />

      <section className="space-y-6">
        <h2>Size scale</h2>
        <p className="text-muted-foreground">
          Tailwind's built-in sizes. Each sets a matching line height.
        </p>
        <div className="space-y-4">
          {SIZES.map((size) => (
            <Specimen key={size} label={size} className={cn(size, "truncate")}>
              {SAMPLE}
            </Specimen>
          ))}
        </div>
      </section>

      <Separator />

      <section className="space-y-6">
        <h2>Families and weights</h2>
        <ExampleGroup title="Font family" className="flex-col items-stretch gap-y-4">
          <Specimen label="font-heading (theme --font-heading)" className="font-heading text-2xl">
            {SAMPLE}
          </Specimen>
          <Specimen label="font-sans (theme --font-sans, the body default)" className="font-sans text-2xl">
            {SAMPLE}
          </Specimen>
          <Specimen label="font-mono" className="font-mono text-xl">
            well_id: NM-0042 · depth_ft: 312.5
          </Specimen>
        </ExampleGroup>
        <ExampleGroup title="Weight · font-heading">
          {WEIGHTS.map((weight) => (
            <Specimen
              key={weight}
              label={weight}
              className={cn("font-heading text-2xl", weight)}
            >
              Water
            </Specimen>
          ))}
        </ExampleGroup>
        <ExampleGroup title="Weight · font-sans">
          {WEIGHTS.map((weight) => (
            <Specimen key={weight} label={weight} className={cn("text-lg", weight)}>
              Water
            </Specimen>
          ))}
        </ExampleGroup>
      </section>


      <Separator />

      <section className="space-y-6">
        <h2>Color</h2>
        <p className="text-muted-foreground">
          Text colors come from theme tokens, so they change with the theme.
        </p>
        <ExampleGroup title="Text color" className="grid sm:grid-cols-2 md:grid-cols-4 items-start">
          {COLORS.map((color) => (
            <Specimen key={color} label={color} className={cn("font-medium", color)}>
              Water levels
            </Specimen>
          ))}
        </ExampleGroup>
      </section>


    </div>
  )
}
