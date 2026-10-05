import { BlockDemo } from "@/showcase/block-demo"
import { PageContent } from "@/showcase/page-header"

export default function DetailCardPage() {
  return (
    <PageContent>
      <BlockDemo
        name="detail-card/well"
        block="detail-card"
        title="Well detail (OcotilloUI)"
      />
      <BlockDemo
        name="detail-card/dataset"
        block="detail-card"
        title="Dataset detail (Weaver)"
      />
      <BlockDemo
        name="detail-card/loading"
        block="detail-card"
        title="Loading"
        description="loading shows skeleton rows and hides the badge and action."
      />
    </PageContent>
  )
}
