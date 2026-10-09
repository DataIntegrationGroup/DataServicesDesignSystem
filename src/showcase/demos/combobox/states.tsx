import * as React from "react"

import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox"
import { Example } from "@/showcase/example"

type SourceKind = { value: string; label: string }

const sourceKinds: SourceKind[] = [
  { value: "postgres", label: "PostgreSQL" },
  { value: "oracle", label: "Oracle" },
  { value: "kafka", label: "Kafka" },
  { value: "s3", label: "Amazon S3" },
  { value: "snowflake", label: "Snowflake" },
  { value: "bigquery", label: "BigQuery" },
]

export default function ComboboxStates() {
  const [kind, setKind] = React.useState<SourceKind | null>(null)
  const [selected, setSelected] = React.useState<SourceKind | null>(sourceKinds[2])
  return (
    <div className="flex flex-wrap items-start gap-x-6 gap-y-4">
      <Example label="default" className="w-56 items-stretch">
        <Combobox items={sourceKinds} value={kind} onValueChange={setKind}>
          <ComboboxInput placeholder="Select source type" aria-label="Source type" />
          <ComboboxContent>
            <ComboboxEmpty>No source types found.</ComboboxEmpty>
            <ComboboxList>
              {(item: SourceKind) => (
                <ComboboxItem key={item.value} value={item}>
                  {item.label}
                </ComboboxItem>
              )}
            </ComboboxList>
          </ComboboxContent>
        </Combobox>
      </Example>
      <Example label="showClear" className="w-56 items-stretch">
        <Combobox items={sourceKinds} value={selected} onValueChange={setSelected}>
          <ComboboxInput placeholder="Select source type" aria-label="Source type" showClear />
          <ComboboxContent>
            <ComboboxEmpty>No source types found.</ComboboxEmpty>
            <ComboboxList>
              {(item: SourceKind) => (
                <ComboboxItem key={item.value} value={item}>
                  {item.label}
                </ComboboxItem>
              )}
            </ComboboxList>
          </ComboboxContent>
        </Combobox>
      </Example>
      <Example label="disabled" className="w-56 items-stretch">
        <Combobox items={sourceKinds} disabled>
          <ComboboxInput placeholder="Select source type" aria-label="Source type" disabled />
          <ComboboxContent>
            <ComboboxList>
              {(item: SourceKind) => (
                <ComboboxItem key={item.value} value={item}>
                  {item.label}
                </ComboboxItem>
              )}
            </ComboboxList>
          </ComboboxContent>
        </Combobox>
      </Example>
    </div>
  )
}
