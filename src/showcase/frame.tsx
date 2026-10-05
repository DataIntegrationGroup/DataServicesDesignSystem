import { demoComponents } from "@/showcase/demos"

/** One demo on its own page, for the block previews' iframes
 *  (`?embed=<demo name>`). An iframe has its own viewport, so the demo's
 *  breakpoints respond to the preview width. */
export function DemoFrame({ name }: { name: string }) {
  const Component = demoComponents[name]
  return (
    <div className="min-h-svh bg-background text-foreground">
      {Component ? <Component /> : <p className="p-6">No demo named {name}.</p>}
    </div>
  )
}
