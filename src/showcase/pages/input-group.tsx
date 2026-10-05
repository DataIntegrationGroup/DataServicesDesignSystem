import { Demo } from "@/showcase/demo"
import { PageContent } from "@/showcase/page-header"

export default function InputGroupPage() {
  return (
    <PageContent>
      <Demo
        name="input-group/size-and-variant"
        title="Size and variant"
        className="flex-col items-stretch"
      />
      <Demo
        name="input-group/addons"
        title="Addons"
        className="grid md:grid-cols-3 items-start"
      />
    </PageContent>
  )
}
