import { Demo } from "@/showcase/demo"
import { PageContent } from "@/showcase/page-header"

export default function PagePage() {
  return (
    <PageContent>
      <Demo name="page/page-shell" title="Page shell" />
      <Demo name="page/bleed" title="Full-bleed page" />
    </PageContent>
  )
}
