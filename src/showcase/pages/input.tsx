import { Demo } from "@/showcase/demo"
import { PageContent } from "@/showcase/page-header"

export default function InputPage() {
  return (
    <PageContent>
      <Demo name="input/input" title="Input" />
      <Demo name="input/textarea" title="Textarea" />
    </PageContent>
  )
}
