import { Demo } from "@/showcase/demo"
import { PageContent } from "@/showcase/page-header"

export default function TogglePage() {
  return (
    <PageContent>
      <Demo name="toggle/toggle" title="Toggle" />
      <Demo name="toggle/toggle-group" title="Toggle group" />
    </PageContent>
  )
}
