import { Demo } from "@/showcase/demo"
import { PageContent } from "@/showcase/page-header"

export default function ChartPage() {
  return (
    <PageContent>
      <Demo name="chart/area" title="Area chart" />
      <Demo name="chart/bar" title="Bar chart" />
    </PageContent>
  )
}
