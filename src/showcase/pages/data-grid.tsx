import { Demo } from "@/showcase/demo"
import { PageContent } from "@/showcase/page-header"

export default function DataGridPage() {
  return (
    <PageContent>
      <Demo
        name="data-grid/editable"
        title="Editable grid"
        description="Canvas-rendered, for large datasets. Themed from the active theme and mode."
      />
    </PageContent>
  )
}
