import { Demo } from "@/showcase/demo"
import { PageContent } from "@/showcase/page-header"

export default function AvatarPage() {
  return (
    <PageContent>
      <Demo name="avatar/sizes" title="Size" />
      <Demo name="avatar/content" title="Content" />
    </PageContent>
  )
}
