import * as React from "react"

import { Example, ExampleWrapper } from "@/components/example"
import { FilterControls } from "@/registry/base-nova/ui/filter-controls"

export default function FilterControlsDemo() {
  const [bbox, setBbox] = React.useState(false)
  const [query, setQuery] = React.useState("")
  return (
    <ExampleWrapper>
      <Example title="Map view and text filters">
        <FilterControls
          bbox={bbox}
          q={query}
          onBboxChange={setBbox}
          onQueryChange={setQuery}
        />
        <p className="text-sm text-muted-foreground">
          bbox: {String(bbox)}, q: “{query}”
        </p>
      </Example>
    </ExampleWrapper>
  )
}
