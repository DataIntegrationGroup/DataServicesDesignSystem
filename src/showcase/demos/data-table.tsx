import { createColumnHelper } from "@tanstack/react-table"

import { Example, ExampleWrapper } from "@/components/example"
import { Badge } from "@/components/ui/badge"
import {
  DataTable,
  DataTableColumnHeader,
  type DataTableFeatures,
} from "@/registry/base-nova/ui/data-table"

type Source = { name: string; host: string; status: string }

const sources: Source[] = [
  { name: "warehouse-prod", host: "db.internal:5432", status: "online" },
  { name: "lakehouse-stg", host: "lake.internal:443", status: "online" },
  { name: "legacy-ora", host: "ora.internal:1521", status: "degraded" },
  { name: "events-kafka", host: "kafka.internal:9092", status: "offline" },
  { name: "archive-s3", host: "s3.internal:443", status: "online" },
  { name: "metrics-pg", host: "metrics.internal:5432", status: "degraded" },
]

const columnHelper = createColumnHelper<DataTableFeatures, Source>()

const columns = columnHelper.columns([
  columnHelper.accessor("name", {
    header: ({ column }) => <DataTableColumnHeader column={column} title="Name" />,
    cell: ({ getValue }) => <span className="font-medium">{getValue()}</span>,
  }),
  columnHelper.accessor("host", {
    header: ({ column }) => <DataTableColumnHeader column={column} title="Host" />,
    cell: ({ getValue }) => <span className="font-mono text-sm">{getValue()}</span>,
  }),
  columnHelper.accessor("status", {
    header: ({ column }) => <DataTableColumnHeader column={column} title="Status" />,
    cell: ({ getValue }) => {
      const status = getValue()
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
  }),
])

export default function DataTableDemo() {
  return (
    <ExampleWrapper className="md:grid-cols-1">
      <Example title='filterColumn="name" pageSize={5}, sortable headers, column visibility'>
        <DataTable
          className="w-full"
          columns={columns}
          data={sources}
          filterColumn="name"
          filterPlaceholder="Filter by name…"
          pageSize={5}
        />
      </Example>
    </ExampleWrapper>
  )
}
