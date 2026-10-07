import * as React from "react"
import {
  CodeIcon,
  ExternalLinkIcon,
  MonitorIcon,
  SmartphoneIcon,
  TabletIcon,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { useTheme } from "@/components/theme-provider"
import { CodeBlock } from "@/showcase/code-block"
import { DemoSection } from "@/showcase/demo-section"
import { blockSources, demoComponents, demoSources } from "@/showcase/demos"
import type { FrameThemeMessage } from "@/showcase/frame"

const WIDTHS = { desktop: "100%", tablet: "768px", mobile: "390px" } as const
type Width = keyof typeof WIDTHS

/**
 * A block preview: the demo in an iframe at desktop, tablet or phone width,
 * so its breakpoints respond, plus a Code view with the usage and the block's
 * own source. `block` names the file in src/blocks. The iframe is sized to
 * the demo, never shorter than `minHeight`, so overlays such as a menu sheet
 * have room.
 */
export function BlockDemo({
  name,
  block,
  title,
  description,
  minHeight = 240,
}: {
  name: string
  block: string
  title: string
  description?: React.ReactNode
  minHeight?: number
}) {
  const [width, setWidth] = React.useState<Width>("desktop")
  const [height, setHeight] = React.useState(minHeight)
  const [code, setCode] = React.useState<{ usage: string; source: string }>()
  const [open, setOpen] = React.useState(false)
  const { theme, palette } = useTheme()
  const frame = React.useRef<HTMLIFrameElement>(null)
  const observer = React.useRef<ResizeObserver>(null)
  const codeId = React.useId()
  const src = `?embed=${encodeURIComponent(name)}`

  React.useEffect(() => {
    return () => observer.current?.disconnect()
  }, [])

  // Pass theme changes to the frame rather than reloading it, so the demo
  // keeps its state.
  React.useEffect(() => {
    const message: FrameThemeMessage = { type: "dsds-frame-theme", theme, palette }
    frame.current?.contentWindow?.postMessage(message, window.location.origin)
  }, [theme, palette])

  if (!demoComponents[name]) throw new Error(`No demo at src/showcase/demos/${name}.tsx`)

  // The iframe is same-origin: size it to its content as that changes. The
  // body is only as tall as the demo; the document is at least as tall as
  // the iframe, so measuring it would never let the iframe shrink.
  const onLoad = (event: React.SyntheticEvent<HTMLIFrameElement>) => {
    const body = event.currentTarget.contentDocument?.body
    if (!body) return
    observer.current?.disconnect()
    observer.current = new ResizeObserver(() =>
      setHeight(Math.max(minHeight, Math.ceil(body.getBoundingClientRect().height)))
    )
    observer.current.observe(body)
  }

  const toggleCode = async () => {
    if (!open && !code) {
      const [usage, source] = await Promise.all([demoSources[name](), blockSources[block]()])
      setCode({ usage, source })
    }
    setOpen((value) => !value)
  }

  return (
    <DemoSection
      name={name}
      title={title}
      description={description}
      actions={
        <>
          <ToggleGroup
            type="single"
            variant="outline"
            spacing={0}
            size="sm"
            value={width}
            onValueChange={(value) => value && setWidth(value as Width)}
            aria-label="Preview width"
          >
            <ToggleGroupItem value="desktop" aria-label="Desktop width">
              <MonitorIcon />
            </ToggleGroupItem>
            <ToggleGroupItem value="tablet" aria-label="Tablet width (768px)">
              <TabletIcon />
            </ToggleGroupItem>
            <ToggleGroupItem value="mobile" aria-label="Phone width (390px)">
              <SmartphoneIcon />
            </ToggleGroupItem>
          </ToggleGroup>
          <Button asChild variant="ghost" size="icon-sm">
            <a href={src} target="_blank" rel="noreferrer" aria-label="Open in a new tab">
              <ExternalLinkIcon />
            </a>
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            aria-expanded={open}
            aria-controls={codeId}
            onClick={toggleCode}
          >
            <CodeIcon /> {open ? "Hide code" : "Code"}
          </Button>
        </>
      }
    >
      <div className="overflow-hidden rounded-xl border bg-muted/40">
        <iframe
          ref={frame}
          title={title}
          src={src}
          onLoad={onLoad}
          className="mx-auto block max-w-full bg-background transition-[width]"
          style={{ width: WIDTHS[width], height }}
        />
      </div>
      {open && code && (
        <Tabs id={codeId} defaultValue="usage">
          <TabsList variant="line">
            <TabsTrigger value="usage">Usage</TabsTrigger>
            <TabsTrigger value="source">Block source</TabsTrigger>
          </TabsList>
          <TabsContent value="usage">
            <CodeBlock code={code.usage} />
          </TabsContent>
          <TabsContent value="source">
            <CodeBlock code={code.source} />
          </TabsContent>
        </Tabs>
      )}
    </DemoSection>
  )
}
