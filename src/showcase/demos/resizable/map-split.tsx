import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Map, Marker } from "@/components/ui/map"
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"
import { Example } from "@/showcase/example"

const sources = [
  { name: "warehouse-prod", status: "online", variant: "success" },
  { name: "lakehouse-stg", status: "online", variant: "success" },
  { name: "legacy-ora", status: "degraded", variant: "warning" },
  { name: "events-kafka", status: "offline", variant: "destructive" },
] as const

export default function ResizableMapSplit() {
  return (
    <div className="flex flex-col gap-4">
      <Example
        label='ResizablePanelGroup orientation="horizontal", ResizableHandle withHandle'
        className="items-stretch"
      >
        <Card className="overflow-hidden p-0">
          <ResizablePanelGroup orientation="horizontal" className="h-[360px]">
            <ResizablePanel defaultSize={65} minSize={30}>
              <Map>
                <Marker longitude={-106.65} latitude={35.08} />
              </Map>
            </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel defaultSize={35} minSize={20}>
              <div className="flex h-full flex-col gap-3 overflow-y-auto bg-card p-4">
                <h4 className="!text-sm !font-semibold tracking-wide text-muted-foreground uppercase">
                  Sources
                </h4>
                {sources.map((source) => (
                  <div
                    key={source.name}
                    className="flex items-center justify-between gap-2 text-sm"
                  >
                    <span className="font-medium">{source.name}</span>
                    <Badge variant={source.variant}>{source.status}</Badge>
                  </div>
                ))}
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </Card>
      </Example>
    </div>
  )
}
