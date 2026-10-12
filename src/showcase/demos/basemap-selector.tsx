import * as React from "react"

import { Example, ExampleWrapper } from "@/components/example"
import {
  BasemapSelector,
  type BasemapOption,
} from "@/registry/base-nova/ui/basemap-selector"
import { DEFAULT_MAP_STYLE } from "@/registry/base-nova/ui/map"

const BASEMAPS: BasemapOption[] = [
  { id: DEFAULT_MAP_STYLE, title: "Positron" },
  { id: "https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json", title: "Voyager" },
  { id: "https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json", title: "Dark Matter" },
]

export default function BasemapSelectorDemo() {
  const [basemap, setBasemap] = React.useState(DEFAULT_MAP_STYLE)
  return (
    <ExampleWrapper>
      <Example title="Basemaps">
        <BasemapSelector options={BASEMAPS} value={basemap} onValueChange={setBasemap} />
      </Example>
    </ExampleWrapper>
  )
}
