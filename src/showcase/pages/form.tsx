import { Demo } from "@/showcase/demo"
import { PageContent } from "@/showcase/page-header"

export default function FormPage() {
  return (
    <PageContent>
      <Demo
        name="form/validated-form"
        title="Validated form"
        description="Accessible error messages, and a searchable Combobox for the source type."
      />
    </PageContent>
  )
}
