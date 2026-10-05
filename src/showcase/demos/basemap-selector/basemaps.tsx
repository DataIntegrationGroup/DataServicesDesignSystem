import * as React from "react"

import { BasemapSelector, type BasemapOption } from "@/components/ui/basemap-selector"
import { DEFAULT_MAP_STYLE } from "@/components/ui/map"
import { Example } from "@/showcase/example"

const BASEMAPS: BasemapOption[] = [
  { id: DEFAULT_MAP_STYLE, title: "Positron" },
  { id: "https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json", title: "Voyager" },
  { id: "https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json", title: "Dark Matter" },
]

export default function BasemapSelectorBasemaps() {
  const [basemap, setBasemap] = React.useState(DEFAULT_MAP_STYLE)
  return (
    <div className="flex flex-wrap items-end gap-x-6 gap-y-4">
      <Example label="options · value · onValueChange" className="w-72 items-stretch">
        <BasemapSelector options={BASEMAPS} value={basemap} onValueChange={setBasemap} />
      </Example>
    </div>
  )
}
