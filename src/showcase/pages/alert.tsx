import { Demo } from "@/showcase/demo"
import { PageContent } from "@/showcase/page-header"

export default function AlertPage() {
  return (
    <PageContent>
      <Demo name="alert/variants" title="Variants" />
      <Demo name="alert/title-only" title="Content" />
    </PageContent>
  )
}
