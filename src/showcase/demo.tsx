import * as React from "react"
import { CodeIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { CodeBlock } from "@/showcase/code-block"
import { demoComponents, demoSources } from "@/showcase/demos"

/**
 * One demo from src/showcase/demos, with a title and a "Code" toggle that
 * shows the demo file's source. `className` sets the preview's layout; by
 * default examples sit in a wrapping row.
 */
export function Demo({
  name,
  title,
  description,
  className,
}: {
  name: string
  title?: string
  description?: React.ReactNode
  className?: string
}) {
  const Component = demoComponents[name]
  const [code, setCode] = React.useState<string>()
  const [open, setOpen] = React.useState(false)
  const codeId = React.useId()

  if (!Component) throw new Error(`No demo at src/showcase/demos/${name}.tsx`)

  const toggle = async () => {
    if (!open && code === undefined) setCode(await demoSources[name]())
    setOpen((value) => !value)
  }

  return (
    <div data-demo={name} className="space-y-3">
      <div className="flex items-end justify-between gap-4">
        <div className="space-y-1">
          {title && (
            <h3 className="!text-sm !leading-normal !font-semibold font-sans text-muted-foreground uppercase tracking-wide">
              {title}
            </h3>
          )}
          {description && (
            <p className="text-sm text-muted-foreground">{description}</p>
          )}
        </div>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          aria-expanded={open}
          aria-controls={codeId}
          onClick={toggle}
        >
          <CodeIcon /> {open ? "Hide code" : "Code"}
        </Button>
      </div>
      <div className={cn("flex flex-wrap items-end gap-x-6 gap-y-4", className)}>
        <Component />
      </div>
      {open && code !== undefined && <CodeBlock id={codeId} code={code} />}
    </div>
  )
}
