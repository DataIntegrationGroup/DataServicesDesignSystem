import * as React from "react"
import { setWorkerUrl } from "maplibre-gl"
import workerUrl from "maplibre-gl/dist/maplibre-gl-worker.mjs?worker&url"

import { Example, ExampleWrapper } from "@/components/example"
import { Card } from "@/components/ui/card"
import {
  BasemapSelector,
  type BasemapOption,
} from "@/registry/base-nova/basemap-selector/basemap-selector"
import {
  LayerSelector,
  type LayerOption,
} from "@/registry/base-nova/layer-selector/layer-selector"
import { DEFAULT_MAP_STYLE, Map, Marker } from "@/registry/base-nova/map/map"

// Once per app, before the first map renders: maplibre-gl 6 can't find its
// worker inside a bundle on its own. This is the Vite form.
setWorkerUrl(workerUrl)

const BASEMAPS: BasemapOption[] = [
  { id: DEFAULT_MAP_STYLE, title: "Positron" },
  { id: "https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json", title: "Voyager" },
  { id: "https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json", title: "Dark Matter" },
]

const LAYERS: LayerOption[] = [
  {
    id: "wells",
    title: "Groundwater wells",
    description: "Monitoring wells with water-level records",
    style: { color: "#0e7490" },
  },
  { id: "springs", title: "Springs", style: { color: "#047857", shape: "square" } },
  { id: "streams", title: "Stream gauges", style: { color: "#1d4ed8", shape: "line" } },
]

export default function MapDemo() {
  const [basemap, setBasemap] = React.useState(DEFAULT_MAP_STYLE)
  const [visible, setVisible] = React.useState(["wells"])
  return (
    <ExampleWrapper className="md:grid-cols-1">
      <Example title="With basemap and layer selectors">
        <Card className="w-full overflow-hidden p-0">
          <div className="grid h-[520px] md:grid-cols-[1fr_300px]">
            <Map mapStyle={basemap}>
              <Marker longitude={-106.65} latitude={35.08} />
            </Map>
            <div className="flex flex-col gap-5 overflow-y-auto border-l bg-card p-4">
              <BasemapSelector options={BASEMAPS} value={basemap} onValueChange={setBasemap} />
              <LayerSelector
                options={LAYERS}
                value={visible}
                onToggle={(id) =>
                  setVisible((v) => (v.includes(id) ? v.filter((x) => x !== id) : [...v, id]))
                }
              />
            </div>
          </div>
        </Card>
      </Example>
      <Example title='showScale={false} controlPosition="bottom-left"'>
        <Card className="w-full overflow-hidden p-0">
          <div className="h-[240px]">
            <Map showScale={false} controlPosition="bottom-left" />
          </div>
        </Card>
      </Example>
    </ExampleWrapper>
  )
}
