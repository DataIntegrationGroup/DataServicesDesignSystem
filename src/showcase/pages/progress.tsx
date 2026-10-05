import { Demo } from "@/showcase/demo"
import { PageContent } from "@/showcase/page-header"

export default function ProgressPage() {
  return (
    <PageContent>
      <Demo name="progress/values" title="Values" className="items-start" />
      <Demo name="progress/controlled" title="Interactive" className="items-start" />
    </PageContent>
  )
}
