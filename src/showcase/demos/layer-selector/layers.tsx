import * as React from "react"

import { LayerSelector, type LayerOption } from "@/components/ui/layer-selector"
import { Example } from "@/showcase/example"

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

export default function LayerSelectorLayers() {
  const [visible, setVisible] = React.useState(["wells"])
  return (
    <>
      <Example label="options · value · onToggle" className="w-80 items-stretch">
        <LayerSelector
          options={LAYERS}
          value={visible}
          onToggle={(id) =>
            setVisible((v) => (v.includes(id) ? v.filter((x) => x !== id) : [...v, id]))
          }
        />
      </Example>
    </>
  )
}
