import { Demo } from "@/showcase/demo"
import { PageContent } from "@/showcase/page-header"

export default function NavBarPage() {
  return (
    <PageContent>
      <Demo name="navbar/page-shell" title="In a page shell" />
      <Demo name="navbar/wide" title="Wide, with large links" />
      <Demo name="navbar/fluid" title="Fluid" />
    </PageContent>
  )
}
