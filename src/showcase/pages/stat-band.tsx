import { Demo } from "@/showcase/demo"
import { PageContent } from "@/showcase/page-header"

export default function StatBandPage() {
  return (
    <PageContent>
      <Demo name="stat-band/four" title="Four stats" />
      <Demo name="stat-band/fewer" title="Fewer stats" />
    </PageContent>
  )
}
