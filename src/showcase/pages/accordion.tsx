import { Demo } from "@/showcase/demo"
import { PageContent } from "@/showcase/page-header"

export default function AccordionPage() {
  return (
    <PageContent>
      <Demo name="accordion/single" title="Single" className="flex-col items-stretch" />
      <Demo name="accordion/multiple" title="Multiple" className="flex-col items-stretch" />
      <Demo name="accordion/plain" title="Plain trigger" className="flex-col items-stretch" />
    </PageContent>
  )
}
