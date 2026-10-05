import * as React from "react"

import { Combobox } from "@/components/ui/combobox"
import { Example } from "@/showcase/example"

const sourceKinds = [
  { value: "postgres", label: "PostgreSQL" },
  { value: "oracle", label: "Oracle" },
  { value: "kafka", label: "Kafka" },
  { value: "s3", label: "Amazon S3" },
  { value: "snowflake", label: "Snowflake" },
  { value: "bigquery", label: "BigQuery" },
]

export default function ComboboxStates() {
  const [kind, setKind] = React.useState("")
  const [selected, setSelected] = React.useState("kafka")
  return (
    <div className="flex flex-wrap items-start gap-x-6 gap-y-4">
      <Example label="default" className="w-56 items-stretch">
        <Combobox
          options={sourceKinds}
          value={kind}
          onValueChange={setKind}
          placeholder="Select source type"
          searchPlaceholder="Search types…"
        />
      </Example>
      <Example label='value="kafka"' className="w-56 items-stretch">
        <Combobox
          options={sourceKinds}
          value={selected}
          onValueChange={setSelected}
          searchPlaceholder="Search types…"
        />
      </Example>
      <Example label="disabled" className="w-56 items-stretch">
        <Combobox
          options={sourceKinds}
          placeholder="Select source type"
          disabled
        />
      </Example>
    </div>
  )
}
