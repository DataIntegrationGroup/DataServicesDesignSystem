import { Demo } from "@/showcase/demo"
import { PageContent } from "@/showcase/page-header"

export default function TabsPage() {
  return (
    <PageContent>
      <Demo name="tabs/variants" title="Variants" />
      <Demo name="tabs/folder" title="Folder" />
    </PageContent>
  )
}
