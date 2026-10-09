import { CodeBlock } from "@/showcase/code-block"
import { Demo } from "@/showcase/demo"
import { DemoSection } from "@/showcase/demo-section"
import { PageContent } from "@/showcase/page-header"

const OVERRIDES = `"overrides": {
  "@glideapps/glide-data-grid": {
    "react": "$react",
    "react-dom": "$react-dom"
  }
}`

export default function DataGridPage() {
  return (
    <PageContent>
      <Demo
        name="data-grid/editable"
        title="Editable grid"
        description="Canvas-rendered, for large datasets. Themed from the active theme and mode."
      />
      <DemoSection title="Installing with npm">
        <p className="max-w-3xl text-muted-foreground">
          Glide Data Grid 6.0.3, its latest stable release, declares React 16–18
          as peers. It runs on React 19, and pnpm and yarn only warn, but npm
          refuses the install. In an npm app, add this to{" "}
          <code>package.json</code> before adding the data grid:
        </p>
        <CodeBlock code={OVERRIDES} lang="json" className="max-w-3xl" />
      </DemoSection>
    </PageContent>
  )
}
