import * as React from "react"

import { FacetCheckboxes } from "@/components/ui/facet-rail"
import { Example } from "@/showcase/example"

export default function FacetCheckboxesVisibleLegend() {
  const [checked, setChecked] = React.useState<string[]>([])
  return (
    <div className="flex flex-wrap items-end gap-x-6 gap-y-4">
      <Example label="FacetCheckboxes with a visible legend" className="items-stretch">
        <FacetCheckboxes
          legend="Source"
          options={[
            { value: "nmbgmr", label: "NMBGMR", count: 27 },
            { value: "usgs", label: "USGS", count: 40 },
            { value: "nmed", label: "NMED", count: 9 },
          ]}
          checked={checked}
          onToggle={(value) =>
            setChecked((prev) =>
              prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
            )
          }
          className="max-w-xs"
        />
      </Example>
    </div>
  )
}
