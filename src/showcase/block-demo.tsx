import * as React from "react"
import { CodeIcon, MonitorIcon, SmartphoneIcon, TabletIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { useTheme } from "@/components/theme-provider"
import { CodeBlock } from "@/showcase/code-block"
import { blockSources, demoComponents, demoSources } from "@/showcase/demos"

const WIDTHS = { desktop: "100%", tablet: "768px", mobile: "390px" } as const
type Width = keyof typeof WIDTHS

/**
 * A block preview: the demo in an iframe at desktop, tablet or phone width,
 * so its breakpoints respond, plus a Code view with the usage and the block's
 * own source. `block` names the file in src/blocks.
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
  title?: string
  description?: React.ReactNode
  minHeight?: number
}) {
  const [width, setWidth] = React.useState<Width>("desktop")
  const [height, setHeight] = React.useState(minHeight)
  const [code, setCode] = React.useState<{ usage: string; source: string }>()
  const [open, setOpen] = React.useState(false)
  const { theme, palette } = useTheme()
  const observer = React.useRef<ResizeObserver>(null)
  const codeId = React.useId()

  React.useEffect(() => {
    return () => observer.current?.disconnect()
  }, [])

  if (!demoComponents[name]) throw new Error(`No demo at src/showcase/demos/${name}.tsx`)

  // The iframe is same-origin: size it to its content as that changes.
  const onLoad = (event: React.SyntheticEvent<HTMLIFrameElement>) => {
    const doc = event.currentTarget.contentDocument
    if (!doc) return
    observer.current?.disconnect()
    observer.current = new ResizeObserver(() =>
      setHeight(Math.max(minHeight, doc.documentElement.scrollHeight))
    )
    observer.current.observe(doc.body)
  }

  const toggleCode = async () => {
    if (!open && !code) {
      const [usage, source] = await Promise.all([demoSources[name](), blockSources[block]()])
      setCode({ usage, source })
    }
    setOpen((value) => !value)
  }

  return (
    <div data-demo={name} className="space-y-3">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="space-y-1">
          {title && (
            <h3 className="!text-sm !leading-normal !font-semibold font-sans text-muted-foreground uppercase tracking-wide">
              {title}
            </h3>
          )}
          {description && <p className="text-sm text-muted-foreground">{description}</p>}
        </div>
        <div className="flex items-center gap-2">
          <ToggleGroup
            type="single"
            variant="outline"
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
        </div>
      </div>
      <div className="overflow-hidden rounded-xl border bg-muted/40">
        <iframe
          // Reload when the theme changes; the frame reads it from storage.
          key={`${palette}-${theme}`}
          title={title ?? name}
          src={`?embed=${encodeURIComponent(name)}`}
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
    </div>
  )
}
