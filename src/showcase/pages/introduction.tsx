import { OriginBadge, PageContent } from "@/showcase/page-header"
import { CodeBlock } from "@/showcase/code-block"
import { DemoSection } from "@/showcase/demo-section"
import { href } from "@/showcase/router"

const INSTALL = `# 1. Base styles and a theme (Ocotillo is the default)
pnpm dlx shadcn@latest add @dataservices/theme-base @dataservices/theme-nmwdi

# 2. Components
pnpm dlx shadcn@latest add @dataservices/button @dataservices/navbar`

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
          Add the <code>@dataservices</code> registry to your app's{" "}
          <code>components.json</code>, then install a theme and the components
          you need. Select the theme with <code>data-theme</code> on{" "}
          <code>&lt;html&gt;</code>. The README has the full steps;{" "}
          <a className={LINK} href={href("colors")}>
            Colors
          </a>{" "}
          and{" "}
          <a className={LINK} href={href("typography")}>
            Typography
          </a>{" "}
          show what a theme provides.
        </p>
        <CodeBlock code={INSTALL} lang="bash" className="max-w-3xl" />
      </DemoSection>
      <DemoSection title="Why a registry">
        <ul className="max-w-3xl list-disc space-y-2 pl-5 text-muted-foreground">
          <li>Components are copied into your app as source, so you own them.</li>
          <li>Themes and shared pieces are built and tested once, here.</li>
          <li>Each app updates when it's ready; there's no package release.</li>
          <li>Most components are plain shadcn/ui, so its docs apply.</li>
        </ul>
      </DemoSection>
      <DemoSection title="Where components come from">
        <p className="max-w-3xl text-muted-foreground">
          The sidebar's Custom group has the blocks and components built for
          our apps; Core has the standard set, based on shadcn/ui. Each page
          shows its origin and the command to install it.
        </p>
        <dl className="grid max-w-3xl gap-x-6 gap-y-3 sm:grid-cols-[auto_1fr]">
          <dt><OriginBadge origin="ds" /></dt>
          <dd className="text-muted-foreground">
            Written for the design system, e.g. App shell, Map, Data table.
          </dd>
          <dt><OriginBadge origin="extended" /></dt>
          <dd className="text-muted-foreground">
            Upstream shadcn/ui with variants the DS adds, e.g. Button's{" "}
            <code>xl</code> size.
          </dd>
          <dt><OriginBadge origin="shadcn" /></dt>
          <dd className="text-muted-foreground">
            Upstream shadcn/ui, styled by the theme tokens. The shadcn/ui docs
            cover their full API.
          </dd>
        </dl>
        <p className="max-w-3xl text-muted-foreground">
          Install all of them from <code>@dataservices</code>, as each page
          shows, so you get the copies tested here.
        </p>
      </DemoSection>
      <DemoSection title="Updating components">
        <p className="max-w-3xl text-muted-foreground">
          Commit first, then check the diff before overwriting.
        </p>
        <CodeBlock code={UPDATE} lang="bash" className="max-w-3xl" />
      </DemoSection>
      <DemoSection title="Making your own changes">
        <ul className="max-w-3xl list-disc space-y-2 pl-5 text-muted-foreground">
          <li>
            Try variants, <code>className</code> and theme tokens before
            editing a component.
          </li>
          <li>For one app, edit its copy and comment the change.</li>
          <li>
            If other apps could use it,{" "}
            <a className={LINK} href={REPO} target="_blank" rel="noreferrer">
              open a PR here
            </a>
            .
          </li>
        </ul>
      </DemoSection>
    </PageContent>
  )
}
