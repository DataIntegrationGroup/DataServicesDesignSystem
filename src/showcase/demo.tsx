import * as React from "react"
import { CodeIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { CodeBlock } from "@/showcase/code-block"
import { DemoSection } from "@/showcase/demo-section"
import { demoComponents, demoSources } from "@/showcase/demos"

/**
 * One demo from src/showcase/demos in a framed preview, with a "Code" toggle
 * that shows the demo file's source. The demo file sets its own layout, so
 * the code you copy looks like the preview.
 */
export function Demo({
  name,
  title,
  description,
}: {
  name: string
  title: string
  description?: React.ReactNode
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
    <DemoSection
      name={name}
      title={title}
      description={description}
      actions={
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
      }
    >
      <div className="rounded-xl border p-6 sm:p-8">
        <Component />
      </div>
      {open && code !== undefined && <CodeBlock id={codeId} code={code} />}
    </DemoSection>
  )
}
