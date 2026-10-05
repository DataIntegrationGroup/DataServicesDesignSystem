import { Demo } from "@/showcase/demo"
import { PageContent } from "@/showcase/page-header"

export default function MapPage() {
  return (
    <PageContent>
      <Demo
        name="map/with-selectors"
        title="Map with a basemap and layer panel"
        description="The selectors are presentational, so the app owns the state."
      />
      <Demo name="map/options" title="Options" />
    </PageContent>
  )
}
