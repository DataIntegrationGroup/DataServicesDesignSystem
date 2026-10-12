import * as React from "react"

import { Example, ExampleWrapper } from "@/components/example"
import {
  LayerSelector,
  type LayerOption,
} from "@/registry/base-nova/ui/layer-selector"

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

const SETTINGS_LAYERS: LayerOption[] = [
  {
    id: "arsenic",
    title: "Arsenic samples",
    style: { color: "#b45309" },
    supportsNoDataFilter: true,
    supportsClusterToggle: true,
    range: { field: "arsenic", min: 0, max: 0.5, unit: "mg/L" },
  },
  {
    id: "recency",
    title: "Monitoring recency",
    style: { color: "#0e7490" },
    facet: {
      field: "recency",
      label: "Last measured",
      options: [
        { value: "active", label: "Active" },
        { value: "stale", label: "Stale" },
      ],
    },
  },
]

type ById<T> = Record<string, T>
const set = <T,>(id: string, v: T) => (prev: ById<T>) => ({ ...prev, [id]: v })
const toggle = (id: string) => (v: string[]) =>
  v.includes(id) ? v.filter((x) => x !== id) : [...v, id]

export default function LayerSelectorDemo() {
  const [visible, setVisible] = React.useState(["wells"])
  const [visibleSettings, setVisibleSettings] = React.useState(["arsenic", "recency"])
  const [opacity, setOpacity] = React.useState<ById<number>>({})
  const [hideNoData, setHideNoData] = React.useState<ById<boolean>>({})
  const [cluster, setCluster] = React.useState<ById<boolean>>({})
  const [range, setRange] = React.useState<ById<[number, number]>>({})
  const [facets, setFacets] = React.useState<ById<string[]>>({})
  return (
    <ExampleWrapper>
      <Example title="Layers">
        <LayerSelector
          options={LAYERS}
          value={visible}
          onToggle={(id) => setVisible(toggle(id))}
        />
      </Example>
      <Example title="Settings popover and loading">
        <LayerSelector
          options={SETTINGS_LAYERS}
          value={visibleSettings}
          loadingIds={["recency"]}
          onToggle={(id) => setVisibleSettings(toggle(id))}
          opacityById={opacity}
          onOpacityChange={(id, v) => setOpacity(set(id, v))}
          hideNoDataById={hideNoData}
          onHideNoDataChange={(id, v) => setHideNoData(set(id, v))}
          clusterById={cluster}
          onClusterChange={(id, v) => setCluster(set(id, v))}
          rangeById={range}
          onRangeChange={(id, v) => setRange(set(id, v))}
          facetValuesById={facets}
          onFacetChange={(id, v) => setFacets(set(id, v))}
        />
      </Example>
    </ExampleWrapper>
  )
}
