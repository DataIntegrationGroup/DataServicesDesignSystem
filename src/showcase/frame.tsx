import * as React from "react"

import { useTheme } from "@/components/theme-provider"
import { demoComponents } from "@/showcase/demos"

/** Posted by BlockDemo when the showcase's theme or mode changes. */
export type FrameThemeMessage = {
  type: "dsds-frame-theme"
  theme: "dark" | "light" | "system"
  palette?: string
}

/** One demo on its own page, for the block previews' iframes
 *  (`?embed=<demo name>`). An iframe has its own viewport, so the demo's
 *  breakpoints respond to the preview width. The root is only as tall as the
 *  demo, so the preview can size the iframe to it. */
export function DemoFrame({ name }: { name: string }) {
  const Component = demoComponents[name]
  const { setTheme, setPalette } = useTheme()

  React.useEffect(() => {
    const onMessage = (event: MessageEvent<FrameThemeMessage>) => {
      if (event.origin !== window.location.origin) return
      if (event.data?.type !== "dsds-frame-theme") return
      setTheme(event.data.theme)
      if (event.data.palette) setPalette(event.data.palette)
    }
    window.addEventListener("message", onMessage)
    return () => window.removeEventListener("message", onMessage)
  }, [setTheme, setPalette])

  return (
    <div data-frame-root className="bg-background text-foreground">
      {Component ? <Component /> : <p className="p-6">No demo named {name}.</p>}
    </div>
  )
}
