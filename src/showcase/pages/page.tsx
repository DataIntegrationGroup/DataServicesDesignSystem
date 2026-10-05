import { Demo } from "@/showcase/demo"
import { PageContent } from "@/showcase/page-header"

export default function PagePage() {
  return (
    <PageContent>
      <Demo name="page/page-shell" title="Page shell" className="flex-col items-stretch" />
      <Demo name="page/bleed" title="Full-bleed page" className="flex-col items-stretch" />
    </PageContent>
  )
}
