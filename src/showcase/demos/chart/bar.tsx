import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import { Example } from "@/showcase/example"

const throughput = [
  { day: "Mon", failed: 80 },
  { day: "Tue", failed: 40 },
  { day: "Wed", failed: 120 },
  { day: "Thu", failed: 60 },
  { day: "Fri", failed: 30 },
  { day: "Sat", failed: 20 },
  { day: "Sun", failed: 10 },
]

const chartConfig = {
  failed: { label: "Failed", color: "var(--chart-5)" },
} satisfies ChartConfig

export default function ChartBar() {
  return (
    <>
      <Example label="BarChart · tooltip with hideLabel" className="items-stretch">
        <Card>
          <CardHeader>
            <CardTitle>Failures by day</CardTitle>
            <CardDescription>BarChart · tooltip with hideLabel</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[240px] w-full">
              <BarChart data={throughput} accessibilityLayer>
                <CartesianGrid vertical={false} />
                <XAxis dataKey="day" tickLine={false} axisLine={false} tickMargin={8} />
                <ChartTooltip content={<ChartTooltipContent hideLabel />} />
                <Bar dataKey="failed" fill="var(--color-failed)" radius={4} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </Example>
    </>
  )
}
