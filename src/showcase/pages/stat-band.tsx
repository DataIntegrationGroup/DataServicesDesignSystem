import { Demo } from "@/showcase/demo"
import { PageContent } from "@/showcase/page-header"

export default function StatBandPage() {
  return (
    <PageContent>
      <Demo name="stat-band/four" title="Four stats" className="flex-col items-stretch" />
      <Demo
        name="stat-band/fewer"
        title="Fewer stats"
        className="grid items-start md:grid-cols-2"
      />
    </PageContent>
  )
}
