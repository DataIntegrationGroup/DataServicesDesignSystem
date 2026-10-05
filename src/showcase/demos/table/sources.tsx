import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Example } from "@/showcase/example"

const sources = [
  { name: "warehouse-prod", host: "db.internal:5432", status: "online" },
  { name: "lakehouse-stg", host: "lake.internal:443", status: "online" },
  { name: "legacy-ora", host: "ora.internal:1521", status: "degraded" },
  { name: "events-kafka", host: "kafka.internal:9092", status: "offline" },
]

export default function TableSources() {
  return (
    <>
      <Example label="TableCaption · right-aligned actions column" className="items-stretch">
        <Card>
          <Table>
            <TableCaption>Connected data sources.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Host</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sources.map((s) => (
                <TableRow key={s.name}>
                  <TableCell className="font-medium">{s.name}</TableCell>
                  <TableCell className="font-mono text-sm">{s.host}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        s.status === "online"
                          ? "default"
                          : s.status === "degraded"
                            ? "secondary"
                            : "destructive"
                      }
                    >
                      {s.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm">
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </Example>
    </>
  )
}
