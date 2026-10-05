import { Demo } from "@/showcase/demo"
import { PageContent } from "@/showcase/page-header"

export default function NavBarPage() {
  return (
    <PageContent>
      <Demo name="navbar/page-shell" title="In a page shell" className="flex-col items-stretch" />
      <Demo name="navbar/wide" title="Wide, with large links" className="flex-col items-stretch" />
      <Demo name="navbar/fluid" title="Fluid" className="flex-col items-stretch" />
    </PageContent>
  )
}
