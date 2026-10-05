import { BlockDemo } from "@/showcase/block-demo"
import { PageContent } from "@/showcase/page-header"

export default function HeroPage() {
  return (
    <PageContent>
      <BlockDemo
        name="hero/default"
        block="hero"
        title="Landing hero"
        description="The Weaver homepage hero, with a prominent search, topic badges and an inverse call to action."
      />
    </PageContent>
  )
}
