import * as React from "react"

import { DataGrid, type DataGridColumn } from "@/components/ui/data-grid"
import { Example } from "@/showcase/example"

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

export default function DataGridEditable() {
  const [rows, setRows] = React.useState(sources)
  return (
    <>
      <Example label="editable (double-click a cell) · onRowsChange" className="items-stretch">
        <DataGrid columns={columns} rows={rows} onRowsChange={setRows} height={240} />
      </Example>
    </>
  )
}
