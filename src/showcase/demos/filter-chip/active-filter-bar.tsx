import * as React from "react"

import { ActiveFilterBar, FilterChip } from "@/components/ui/filter-chip"
import { Example } from "@/showcase/example"

const INITIAL = [
  { kind: "Search", value: "“arsenic”" },
  { kind: "Topic", value: "Water quality" },
  { kind: "Source", value: "NMED" },
]

export default function ActiveFilterBarExample() {
  const [filters, setFilters] = React.useState(INITIAL)
  return (
    <div className="flex flex-col gap-4">
      <Example label="ActiveFilterBar onClearAll + FilterChips" className="items-stretch">
        {filters.length > 0 ? (
          <ActiveFilterBar
            onClearAll={() => setFilters([])}
            className="rounded-xl border bg-card px-4 py-2.5"
          >
            {filters.map((filter) => (
              <FilterChip
                key={filter.kind}
                kind={filter.kind}
                value={filter.value}
                onRemove={() =>
                  setFilters((prev) => prev.filter((f) => f.kind !== filter.kind))
                }
              />
            ))}
          </ActiveFilterBar>
        ) : (
          <button
            type="button"
            className="self-start text-sm text-primary underline-offset-4 hover:underline"
            onClick={() => setFilters(INITIAL)}
          >
            Filters cleared. Reset
          </button>
        )}
      </Example>
    </div>
  )
}
