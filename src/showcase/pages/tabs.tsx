import { Demo } from "@/showcase/demo"
import { PageContent } from "@/showcase/page-header"

export default function TabsPage() {
  return (
    <PageContent>
      <Demo name="tabs/variants" title="Variants" className="grid items-start md:grid-cols-2" />
      <Demo name="tabs/folder" title="Folder" className="flex-col items-stretch" />
    </PageContent>
  )
}
