import * as React from "react"

import { LayerSelector, type LayerOption } from "@/components/ui/layer-selector"
import { Example } from "@/showcase/example"

const LAYERS: LayerOption[] = [
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

export default function LayerSelectorSettings() {
  const [visible, setVisible] = React.useState(["arsenic", "recency"])
  const [opacity, setOpacity] = React.useState<ById<number>>({})
  const [hideNoData, setHideNoData] = React.useState<ById<boolean>>({})
  const [cluster, setCluster] = React.useState<ById<boolean>>({})
  const [range, setRange] = React.useState<ById<[number, number]>>({})
  const [facets, setFacets] = React.useState<ById<string[]>>({})
  return (
    <div className="flex flex-wrap items-end gap-x-6 gap-y-4">
      <Example label="settings popover (gear icon)" className="w-80 items-stretch">
        <LayerSelector
          options={LAYERS}
          value={visible}
          loadingIds={["recency"]}
          onToggle={(id) =>
            setVisible((v) => (v.includes(id) ? v.filter((x) => x !== id) : [...v, id]))
          }
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
    </div>
  )
}
