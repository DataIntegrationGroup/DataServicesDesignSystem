import { Demo } from "@/showcase/demo"
import { PageContent } from "@/showcase/page-header"

export default function KbdPage() {
  return (
    <PageContent>
      <Demo name="kbd/kbd" title="Keys" />
      <Demo name="kbd/input-hint" title="In an input group" />
    </PageContent>
  )
}
