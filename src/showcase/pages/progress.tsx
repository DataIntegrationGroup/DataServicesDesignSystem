import { Demo } from "@/showcase/demo"
import { PageContent } from "@/showcase/page-header"

export default function ProgressPage() {
  return (
    <PageContent>
      <Demo name="progress/values" title="Values" />
      <Demo name="progress/controlled" title="Interactive" />
    </PageContent>
  )
}
