import { Demo } from "@/showcase/demo"
import { PageContent } from "@/showcase/page-header"

export default function AlertPage() {
  return (
    <PageContent>
      <Demo name="alert/variants" title="Variants" className="flex-col items-stretch" />
      <Demo name="alert/title-only" title="Content" className="flex-col items-stretch" />
    </PageContent>
  )
}
