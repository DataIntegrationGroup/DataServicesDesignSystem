import { Demo } from "@/showcase/demo"
import { PageContent } from "@/showcase/page-header"

export default function EChartPage() {
  return (
    <PageContent>
      <Demo
        name="echart/zoom"
        title="Interactive chart"
        description="For heavier, interactive charting. Themed from the active theme and mode."
      />
    </PageContent>
  )
}
