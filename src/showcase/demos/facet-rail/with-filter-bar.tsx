import * as React from "react"

import { ActiveFilterBar, FilterChip } from "@/components/ui/filter-chip"
import {
  FacetCheckboxes,
  FacetRail,
  FacetRailItem,
  type FacetOption,
} from "@/components/ui/facet-rail"
import { Example } from "@/showcase/example"

const FACETS: { key: string; title: string; options: FacetOption[] }[] = [
  {
    key: "topic",
    title: "Topic",
    options: [
      { value: "levels", label: "Water levels", count: 42 },
      { value: "quality", label: "Water quality", count: 31 },
      { value: "wells", label: "Wells", count: 18 },
    ],
  },
  {
    key: "source",
    title: "Source",
    options: [
      { value: "nmbgmr", label: "NMBGMR", count: 27 },
      { value: "usgs", label: "USGS", count: 40 },
      { value: "nmed", label: "NMED", count: 9 },
    ],
  },
]

export default function FacetRailWithFilterBar() {
  const [checked, setChecked] = React.useState<Record<string, string[]>>({
    topic: ["levels", "quality"],
    source: [],
  })
  const toggle = (facet: string, value: string) =>
    setChecked((prev) => ({
      ...prev,
      [facet]: prev[facet].includes(value)
        ? prev[facet].filter((v) => v !== value)
        : [...prev[facet], value],
    }))
  const applied = FACETS.flatMap((facet) =>
    facet.options
      .filter((option) => checked[facet.key].includes(option.value))
      .map((option) => ({ facet, option }))
  )

  return (
    <div className="grid items-start gap-6 md:grid-cols-[18rem_1fr]">
      <Example
        label='FacetRail + FacetRailItem + FacetCheckboxes legendHidden countLabel="datasets"'
        className="items-stretch"
      >
        <FacetRail defaultValue={["topic"]}>
          {FACETS.map((facet) => (
            <FacetRailItem
              key={facet.key}
              value={facet.key}
              title={facet.title}
              selectedCount={checked[facet.key].length}
            >
              <FacetCheckboxes
                legend={facet.title}
                legendHidden
                countLabel="datasets"
                options={facet.options}
                checked={checked[facet.key]}
                onToggle={(value) => toggle(facet.key, value)}
              />
            </FacetRailItem>
          ))}
        </FacetRail>
      </Example>
      <Example
        label="ActiveFilterBar + FilterChip (rendered only while filters are applied)"
        className="items-stretch"
      >
        {applied.length > 0 ? (
          <ActiveFilterBar
            onClearAll={() => setChecked({ topic: [], source: [] })}
            className="rounded-xl border bg-card px-4 py-2.5"
          >
            {applied.map(({ facet, option }) => (
              <FilterChip
                key={`${facet.key}-${option.value}`}
                kind={facet.title}
                value={String(option.label)}
                onRemove={() => toggle(facet.key, option.value)}
              />
            ))}
          </ActiveFilterBar>
        ) : (
          <p className="text-sm text-muted-foreground">
            No filters applied. Check an option in the rail.
          </p>
        )}
      </Example>
    </div>
  )
}
