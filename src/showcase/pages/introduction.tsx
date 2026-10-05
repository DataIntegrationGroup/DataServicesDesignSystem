import { OriginBadge, PageContent } from "@/showcase/page-header"
import { CodeBlock } from "@/showcase/code-block"
import { href } from "@/showcase/router"

const INSTALL = `# 1. Base styles and a theme (Ocotillo is the default)
npx shadcn@latest add @dataservices/theme-base @dataservices/theme-nmwdi

# 2. Components
npx shadcn@latest add @dataservices/button @dataservices/navbar`

export default function IntroductionPage() {
  return (
    <PageContent>
      <section className="space-y-4">
        <h2 className="!text-2xl">Getting started</h2>
        <p className="max-w-3xl text-muted-foreground">
          Add the <code>@dataservices</code> registry to your app's{" "}
          <code>components.json</code>, then install a theme and the components
          you need. Select the theme with <code>data-theme</code> on{" "}
          <code>&lt;html&gt;</code>. The README has the full steps;{" "}
          <a className="text-primary underline-offset-4 hover:underline" href={href("colors")}>
            Colors
          </a>{" "}
          and{" "}
          <a className="text-primary underline-offset-4 hover:underline" href={href("typography")}>
            Typography
          </a>{" "}
          show what a theme provides.
        </p>
        <CodeBlock code={INSTALL} lang="bash" className="max-w-3xl" />
      </section>
      <section className="space-y-4">
        <h2 className="!text-2xl">Where components come from</h2>
        <p className="max-w-3xl text-muted-foreground">
          Each component page shows its origin and the command to install it.
          The sidebar's "DS-specific only" switch hides the unchanged upstream
          components.
        </p>
        <dl className="grid max-w-3xl gap-x-6 gap-y-3 sm:grid-cols-[auto_1fr]">
          <dt><OriginBadge origin="ds" /></dt>
          <dd className="text-muted-foreground">
            Written for the design system, e.g. NavBar, Map, Stat band.
          </dd>
          <dt><OriginBadge origin="extended" /></dt>
          <dd className="text-muted-foreground">
            Upstream shadcn/ui with variants the DS adds, e.g. Button's{" "}
            <code>xl</code> size. Install these from <code>@dataservices</code>{" "}
            to get the variants.
          </dd>
          <dt><OriginBadge origin="shadcn" /></dt>
          <dd className="text-muted-foreground">
            Upstream shadcn/ui, styled by the theme tokens. The shadcn/ui docs
            cover their full API.
          </dd>
        </dl>
      </section>
    </PageContent>
  )
}
