import * as React from "react"

import { BasemapSelector, type BasemapOption } from "@/components/ui/basemap-selector"
import { Card } from "@/components/ui/card"
import { LayerSelector, type LayerOption } from "@/components/ui/layer-selector"
import { DEFAULT_MAP_STYLE, Map, Marker } from "@/components/ui/map"
import { Example } from "@/showcase/example"

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

export default function MapWithSelectors() {
  const [basemap, setBasemap] = React.useState(DEFAULT_MAP_STYLE)
  const [visibleLayers, setVisibleLayers] = React.useState(["wells"])
  return (
    <>
      <Example
        label='defaults: showNavigation showScale controlPosition="top-right"'
        className="items-stretch"
      >
        <Card className="overflow-hidden p-0">
          <div className="grid h-[520px] md:grid-cols-[1fr_300px]">
            <Map mapStyle={basemap}>
              <Marker longitude={-106.65} latitude={35.08} />
            </Map>
            <div className="space-y-5 overflow-y-auto border-l bg-card p-4">
              <Example
                label="BasemapSelector"
                className="items-stretch"
              >
                <BasemapSelector options={BASEMAPS} value={basemap} onValueChange={setBasemap} />
              </Example>
              <Example
                label="LayerSelector"
                className="items-stretch"
              >
                <LayerSelector
                  options={LAYERS}
                  value={visibleLayers}
                  onToggle={(id) =>
                    setVisibleLayers((v) =>
                      v.includes(id) ? v.filter((x) => x !== id) : [...v, id]
                    )
                  }
                />
              </Example>
            </div>
          </div>
        </Card>
      </Example>
    </>
  )
}
