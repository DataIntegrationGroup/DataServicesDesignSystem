import { Demo } from "@/showcase/demo"
import { PageContent } from "@/showcase/page-header"

export default function BadgePage() {
  return (
    <PageContent>
      <Demo name="badge/variants" title="Variants" />
      <Demo name="badge/status" title="Status" />
      <Demo name="badge/tones" title="Tones (categories, not status)" />
      <Demo name="badge/on-image" title="On a dark band" />
      <Demo name="badge/content" title="Content" />
    </PageContent>
  )
}
