import { Demo } from "@/showcase/demo"
import { PageContent } from "@/showcase/page-header"

export default function ButtonPage() {
  return (
    <PageContent>
      <Demo name="button/variants" title="Variants" />
      <Demo name="button/sizes" title="Sizes" />
      <Demo name="button/inverse" title="On a dark band" />
      <Demo name="button/icon-sizes" title="Icon sizes" />
      <Demo name="button/content" title="Content and state" />
    </PageContent>
  )
}
