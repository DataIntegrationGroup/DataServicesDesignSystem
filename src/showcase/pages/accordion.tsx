import { Demo } from "@/showcase/demo"
import { PageContent } from "@/showcase/page-header"

export default function AccordionPage() {
  return (
    <PageContent>
      <Demo name="accordion/single" title="Single" />
      <Demo name="accordion/multiple" title="Multiple" />
    </PageContent>
  )
}
