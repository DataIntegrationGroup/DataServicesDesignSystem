import { Demo } from "@/showcase/demo"
import { PageContent } from "@/showcase/page-header"

export default function CardPage() {
  return (
    <PageContent>
      <Demo name="card/composition" title="Composition" className="grid md:grid-cols-2 items-start" />
      <Demo name="card/interactive" title="Interactive" className="grid md:grid-cols-2 items-stretch" />
    </PageContent>
  )
}
