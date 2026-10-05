import { Demo } from "@/showcase/demo"
import { PageContent } from "@/showcase/page-header"

export default function OnboardingTourPage() {
  return (
    <PageContent>
      <Demo
        name="onboarding-tour/start-tour"
        title="Tour"
        description="Spotlights real UI one step at a time and remembers it was seen (per storageKey). This one points at the theme and mode controls in the header."
      />
    </PageContent>
  )
}
