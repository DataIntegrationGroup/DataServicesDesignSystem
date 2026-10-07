import { BlockDemo } from "@/showcase/block-demo"
import { PageContent } from "@/showcase/page-header"

export default function TopNavPage() {
  return (
    <PageContent>
      <BlockDemo
        name="top-nav/default"
        block="top-nav"
        title="Content site"
        description="Switch to the phone width to see the menu."
        minHeight={460}
      />
    </PageContent>
  )
}
