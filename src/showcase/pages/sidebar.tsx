import { Demo } from "@/showcase/demo"
import { PageContent } from "@/showcase/page-header"

export default function SidebarPage() {
  return (
    <PageContent>
      <Demo
        name="sidebar/static"
        title="Static sidebar"
        className="flex-col items-stretch"
      />
    </PageContent>
  )
}
