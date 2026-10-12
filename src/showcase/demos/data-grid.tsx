import * as React from "react"

import { Example, ExampleWrapper } from "@/components/example"
import {
  DataGrid,
  type DataGridColumn,
} from "@/registry/base-nova/ui/data-grid"

type Source = { name: string; host: string; status: string }

const sources: Source[] = [
  { name: "warehouse-prod", host: "db.internal:5432", status: "online" },
  { name: "lakehouse-stg", host: "lake.internal:443", status: "online" },
  { name: "legacy-ora", host: "ora.internal:1521", status: "degraded" },
  { name: "events-kafka", host: "kafka.internal:9092", status: "offline" },
]

const columns: DataGridColumn<Source>[] = [
  { id: "name", title: "Name", width: 200 },
  { id: "host", title: "Host", width: 240 },
  { id: "status", title: "Status", width: 140 },
]

export default function DataGridDemo() {
  const [rows, setRows] = React.useState(sources)
  return (
    <ExampleWrapper className="md:grid-cols-1">
      <Example title="Editable (double-click a cell)">
        <DataGrid
          className="w-full"
          columns={columns}
          rows={rows}
          onRowsChange={setRows}
          height={240}
        />
      </Example>
    </ExampleWrapper>
  )
}
