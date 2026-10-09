import { Demo } from "@/showcase/demo"
import { PageContent } from "@/showcase/page-header"

export default function LayerSelectorPage() {
  return (
    <PageContent>
      <Demo name="layer-selector/layers" title="Layers" />
      <Demo name="layer-selector/settings" title="Layer settings" />
    </PageContent>
  )
}
