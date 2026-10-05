import { BlockDemo } from "@/showcase/block-demo"
import { PageContent } from "@/showcase/page-header"

export default function SiteHeaderPage() {
  return (
    <PageContent>
      <BlockDemo
        name="site-header/default"
        block="site-header"
        title="Site header"
        description="Switch to the phone width to see the menu."
        minHeight={460}
      />
    </PageContent>
  )
}
