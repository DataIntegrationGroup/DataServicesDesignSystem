import { Demo } from "@/showcase/demo"
import { PageContent } from "@/showcase/page-header"

export default function SkeletonPage() {
  return (
    <PageContent>
      <Demo name="skeleton/shapes" title="Shapes" className="items-start" />
    </PageContent>
  )
}
