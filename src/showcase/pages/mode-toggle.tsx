import { Demo } from "@/showcase/demo"
import { PageContent } from "@/showcase/page-header"

export default function ModeTogglePage() {
  return (
    <PageContent>
      <Demo
        name="mode-toggle/mode-toggle"
        title="Mode toggle"
        description="Switches light and dark for the whole app. Wrap the app in ThemeProvider (installed with it); the header's toggle is the same component."
      />
    </PageContent>
  )
}
