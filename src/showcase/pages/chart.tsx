import { Demo } from "@/showcase/demo"
import { PageContent } from "@/showcase/page-header"

export default function ChartPage() {
  return (
    <PageContent>
      <div className="grid items-start gap-10 md:grid-cols-2">
        <Demo name="chart/area" title="Area chart" className="flex-col items-stretch" />
        <Demo name="chart/bar" title="Bar chart" className="flex-col items-stretch" />
      </div>
    </PageContent>
  )
}
