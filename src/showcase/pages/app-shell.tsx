import { BlockDemo } from "@/showcase/block-demo"
import { PageContent } from "@/showcase/page-header"

export default function AppShellPage() {
  return (
    <PageContent>
      <BlockDemo
        name="app-shell/default"
        block="app-shell"
        title="Tool-style app"
        description="Collapse the sidebar, open Wells, try Map (it collapses the sidebar) and Help (the side panel). At phone width the sidebar becomes a menu."
        minHeight={620}
      />
    </PageContent>
  )
}
