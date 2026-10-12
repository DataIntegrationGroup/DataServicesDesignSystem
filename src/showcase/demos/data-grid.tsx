import * as React from "react"

import { Example, ExampleWrapper } from "@/components/example"
import {
  DataGrid,
  type DataGridColumn,
} from "@/registry/base-nova/ui/data-grid"

type Source = {
  name: string
  host: string
  status: string
  tables: number
  replicated: boolean
}

const sources: Source[] = [
  { name: "warehouse-prod", host: "db.internal:5432", status: "online", tables: 412, replicated: true },
  { name: "lakehouse-stg", host: "lake.internal:443", status: "online", tables: 87, replicated: false },
  { name: "legacy-ora", host: "ora.internal:1521", status: "degraded", tables: 1290, replicated: true },
  { name: "events-kafka", host: "kafka.internal:9092", status: "offline", tables: 14, replicated: false },
]

const columns: DataGridColumn<Source>[] = [
  { id: "name", title: "Name", width: 200 },
  { id: "host", title: "Host", width: 240 },
  { id: "status", title: "Status", width: 140 },
  { id: "tables", title: "Tables", width: 100, kind: "number" },
  { id: "replicated", title: "Replicated", width: 120, kind: "boolean" },
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
