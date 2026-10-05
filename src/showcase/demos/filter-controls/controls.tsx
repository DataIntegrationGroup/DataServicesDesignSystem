import * as React from "react"

import { FilterControls } from "@/components/ui/filter-controls"
import { Example } from "@/showcase/example"

export default function FilterControlsDemo() {
  const [bbox, setBbox] = React.useState(false)
  const [query, setQuery] = React.useState("")
  return (
    <div className="flex flex-wrap items-end gap-x-6 gap-y-4">
      <Example label="FilterControls">
        <FilterControls
          bbox={bbox}
          q={query}
          onBboxChange={setBbox}
          onQueryChange={setQuery}
        />
      </Example>
    </div>
  )
}
