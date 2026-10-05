import { Demo } from "@/showcase/demo"
import { PageContent } from "@/showcase/page-header"

export default function ResizablePage() {
  return (
    <PageContent>
      <Demo
        name="resizable/map-split"
        title="Map and source panel"
        description="Drag the divider to resize the map against the source list."
        className="flex-col items-stretch"
      />
    </PageContent>
  )
}
