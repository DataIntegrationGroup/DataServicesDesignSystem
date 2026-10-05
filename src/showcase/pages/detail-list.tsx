import { Demo } from "@/showcase/demo"
import { PageContent } from "@/showcase/page-header"

export default function DetailListPage() {
  return (
    <PageContent>
      <Demo
        name="detail-list/default"
        title="Sections of label/value pairs"
        description="Side by side from the sm breakpoint, stacked below it."
      />
    </PageContent>
  )
}
