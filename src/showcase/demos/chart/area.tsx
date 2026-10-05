import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import { Example } from "@/showcase/example"

const throughput = [
  { day: "Mon", ingested: 1820, failed: 80 },
  { day: "Tue", ingested: 2150, failed: 40 },
  { day: "Wed", ingested: 1990, failed: 120 },
  { day: "Thu", ingested: 2480, failed: 60 },
  { day: "Fri", ingested: 2710, failed: 30 },
  { day: "Sat", ingested: 1240, failed: 20 },
  { day: "Sun", ingested: 980, failed: 10 },
]

const chartConfig = {
  ingested: { label: "Ingested", color: "var(--chart-1)" },
  failed: { label: "Failed", color: "var(--chart-5)" },
} satisfies ChartConfig

export default function ChartArea() {
  return (
    <div className="flex flex-col gap-4">
      <Example label="AreaChart · stacked · tooltip + legend" className="items-stretch">
        <Card>
          <CardHeader>
            <CardTitle>Ingestion throughput</CardTitle>
            <CardDescription>AreaChart · stacked · tooltip + legend</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[240px] w-full">
              <AreaChart data={throughput} accessibilityLayer>
                <CartesianGrid vertical={false} />
                <XAxis dataKey="day" tickLine={false} axisLine={false} tickMargin={8} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <ChartLegend content={<ChartLegendContent />} />
                <Area
                  dataKey="ingested"
                  type="monotone"
                  fill="var(--color-ingested)"
                  fillOpacity={0.3}
                  stroke="var(--color-ingested)"
                  stackId="a"
                />
                <Area
                  dataKey="failed"
                  type="monotone"
                  fill="var(--color-failed)"
                  fillOpacity={0.3}
                  stroke="var(--color-failed)"
                  stackId="a"
                />
              </AreaChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </Example>
    </div>
  )
}
