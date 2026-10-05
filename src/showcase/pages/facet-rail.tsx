import { Demo } from "@/showcase/demo"
import { PageContent } from "@/showcase/page-header"

export default function FacetRailPage() {
  return (
    <PageContent>
      <Demo
        name="facet-rail/with-filter-bar"
        title="Rail with an active filter bar"
        description="A working filter rail, as on Weaver's datasets page. Check or remove filters to see both update."
        className="grid items-start gap-6 md:grid-cols-[18rem_1fr]"
      />
      <Demo name="facet-rail/visible-legend" title="Facet checkboxes" />
    </PageContent>
  )
}
