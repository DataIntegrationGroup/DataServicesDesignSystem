import { PageContent } from "@/showcase/page-header"
import { CodeBlock } from "@/showcase/code-block"
import { DemoSection } from "@/showcase/demo-section"

const NEW_APP = `pnpm dlx shadcn@latest init -t vite -n my-app https://raw.githubusercontent.com/DataIntegrationGroup/DataServicesDesignSystem/main/public/r/base.json
cd my-app
pnpm dlx shadcn@latest add @dataservices/app-shell`

const EXISTING_APP = `pnpm dlx shadcn@latest registry add "@dataservices=https://raw.githubusercontent.com/DataIntegrationGroup/DataServicesDesignSystem/main/public/r/{name}.json"
pnpm dlx shadcn@latest add @dataservices/theme-ocotillo`

const CSS = `@import "./styles/ds-base.css";
@import "./styles/themes/ocotillo.css";`

const UPDATE = `# See what changed
pnpm dlx shadcn@latest add @dataservices/button --dry-run --diff

# Update
pnpm dlx shadcn@latest add @dataservices/button --overwrite`

const REPO = "https://github.com/DataIntegrationGroup/DataServicesDesignSystem"

const LINK = "text-primary underline underline-offset-4"

export default function IntroductionPage() {
  return (
    <PageContent>
      <DemoSection title="Getting started">
        <p className="max-w-3xl text-muted-foreground">
          Start a new Vite app on the design system, then add the components
          you need:
        </p>
        <CodeBlock code={NEW_APP} lang="bash" className="max-w-3xl" />
        <p className="max-w-3xl text-muted-foreground">
          In an existing shadcn app, add the registry and a theme instead:
        </p>
        <CodeBlock code={EXISTING_APP} lang="bash" className="max-w-3xl" />
        <p className="max-w-3xl text-muted-foreground">
          Then replace everything in <code>src/index.css</code> with:
        </p>
        <CodeBlock code={CSS} lang="bash" className="max-w-3xl" />
      </DemoSection>
      <DemoSection title="Why a registry">
        <ul className="max-w-3xl list-disc space-y-2 pl-5 text-muted-foreground">
          <li>Components are copied into your app as source, so you own them.</li>
          <li>Themes and shared pieces are built and tested once, here.</li>
          <li>Each app updates when it's ready; there's no package release.</li>
          <li>Most components are plain shadcn/ui, so its docs apply.</li>
        </ul>
      </DemoSection>
      <DemoSection title="What's in the sidebar">
        <ul className="max-w-3xl list-disc space-y-2 pl-5 text-muted-foreground">
          <li>
            <span className="font-medium text-foreground">Custom:</span> blocks
            and components built by us or brought in for our apps.
          </li>
          <li>
            <span className="font-medium text-foreground">Core:</span> the
            standard shadcn/ui set. "Ext" marks the ones with our variants.
          </li>
        </ul>
      </DemoSection>
      <DemoSection title="Updating and changing components">
        <p className="max-w-3xl text-muted-foreground">
          Commit first, then check the diff before overwriting:
        </p>
        <CodeBlock code={UPDATE} lang="bash" className="max-w-3xl" />
        <p className="max-w-3xl text-muted-foreground">
          To change a component for one app, edit its copy and comment the
          change. If other apps could use it,{" "}
          <a className={LINK} href={REPO} target="_blank" rel="noreferrer">
            open a PR here
          </a>
          .
        </p>
      </DemoSection>
    </PageContent>
  )
}
