import * as React from "react"
import type { EChartsOption } from "echarts"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { EChart } from "@/components/ui/echart"
import { Example } from "@/showcase/example"

export default function EChartZoom() {
  const option = React.useMemo<EChartsOption>(() => {
    const days = Array.from({ length: 30 }, (_, i) => `D${i + 1}`)
    const ingested = days.map((_, i) => Math.round(1800 + Math.sin(i / 3) * 600 + i * 25))
    const failed = days.map((_, i) => Math.round(60 + Math.cos(i / 2) * 40 + 30))
    return {
      tooltip: { trigger: "axis" },
      legend: { data: ["Ingested", "Failed"], top: 0 },
      grid: { left: 48, right: 16, top: 36, bottom: 56 },
      xAxis: { type: "category", boundaryGap: false, data: days },
      yAxis: { type: "value" },
      dataZoom: [
        { type: "inside", start: 40, end: 100 },
        { type: "slider", start: 40, end: 100, height: 18, bottom: 12 },
      ],
      series: [
        {
          name: "Ingested",
          type: "line",
          smooth: true,
          showSymbol: false,
          areaStyle: { opacity: 0.15 },
          data: ingested,
        },
        { name: "Failed", type: "bar", data: failed },
      ],
    }
  }, [])

  return (
    <div className="flex flex-col gap-4">
      <Example label="line + bar combo · dataZoom (drag the slider or scroll)" className="items-stretch">
        <Card>
          <CardHeader>
            <CardTitle>Ingestion vs failures</CardTitle>
            <CardDescription>Interactive dataZoom · 30-day window</CardDescription>
          </CardHeader>
          <CardContent>
            <EChart option={option} height={320} />
          </CardContent>
        </Card>
      </Example>
    </div>
  )
}
