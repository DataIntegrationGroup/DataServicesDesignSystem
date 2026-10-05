import type { ColumnDef } from "@tanstack/react-table"

import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { DataTable, DataTableColumnHeader } from "@/components/ui/data-table"
import { Example } from "@/showcase/example"

const sources = [
  { name: "warehouse-prod", host: "db.internal:5432", status: "online" },
  { name: "lakehouse-stg", host: "lake.internal:443", status: "online" },
  { name: "legacy-ora", host: "ora.internal:1521", status: "degraded" },
  { name: "events-kafka", host: "kafka.internal:9092", status: "offline" },
]

type Source = (typeof sources)[number]

const columns: ColumnDef<Source>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Name" />,
    cell: ({ row }) => <span className="font-medium">{row.getValue("name")}</span>,
  },
  {
    accessorKey: "host",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Host" />,
    cell: ({ row }) => <span className="font-mono text-sm">{row.getValue("host")}</span>,
  },
  {
    accessorKey: "status",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Status" />,
    cell: ({ row }) => {
      const status = row.getValue<string>("status")
      return (
        <Badge
          variant={
            status === "online" ? "default" : status === "degraded" ? "secondary" : "destructive"
          }
        >
          {status}
        </Badge>
      )
    },
  },
]

export default function DataTableSources() {
  return (
    <>
      <Example
        label='filterColumn="name" pageSize={5} · sortable headers, column visibility'
        className="items-stretch"
      >
        <Card className="p-4">
          <DataTable
            columns={columns}
            data={sources}
            filterColumn="name"
            filterPlaceholder="Filter by name…"
            pageSize={5}
          />
        </Card>
      </Example>
    </>
  )
}
