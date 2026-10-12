import type { ReactNode } from "react"

const REGISTRY_URL =
  "https://raw.githubusercontent.com/DataIntegrationGroup/DataServicesDesignSystem/main/public/r"

// The same ground as the README's "How it's built" and install sections.
const POINTS: { title: string; body: ReactNode }[] = [
  {
    title: "Registered here",
    body: (
      <>
        The two brand themes (Ocotillo, Weaver), a base item for new apps, and
        the components we built: app shell, maps, charts, tables. Nothing else
        goes in <Code>registry.json</Code>.
      </>
    ),
  },
  {
    title: "Not registered",
    body: (
      <>
        Upstream components. Our items list them by name{" "}
        (<Code>"button"</Code>), so each app gets upstream's current version
        for its own style, along with upstream's fixes. We don't plan to fork an upstream
        file to add a variant; we'd wrap it in a new item instead.
      </>
    ),
  },
  {
    title: "Themes",
    body: (
      <>
        <Code>registry:theme</Code> items shaped like the docs' theme example:
        CSS variables only, so every upstream component picks them up with no
        changes.
      </>
    ),
  },
]

function Code({ children }: { children: ReactNode }) {
  return (
    <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
      {children}
    </code>
  )
}

function Command({ children }: { children: string }) {
  return (
    <pre className="overflow-x-auto rounded-md bg-muted px-4 py-3 text-sm">
      <code>{children}</code>
    </pre>
  )
}

export function IntroductionPage() {
  return (
    <div className="flex max-w-3xl flex-col gap-10">
      <section className="flex flex-col gap-3">
        <h2 className="font-heading text-xl font-semibold">How it's built</h2>
        <p className="leading-7">
          The registry follows shadcn's{" "}
          <a
            className="font-medium text-primary underline underline-offset-4"
            href="https://ui.shadcn.com/docs/registry"
            target="_blank"
            rel="noreferrer"
          >
            registry docs
          </a>
          : publish only what upstream doesn't have, and depend on upstream for
          the rest. Everything is built on base-nova (Base UI), shadcn's
          default for new projects.
        </p>
        <dl className="flex flex-col gap-4">
          {POINTS.map((point) => (
            <div key={point.title} className="flex flex-col gap-1">
              <dt className="font-semibold">{point.title}</dt>
              <dd className="leading-7 text-muted-foreground">{point.body}</dd>
            </div>
          ))}
        </dl>
        <p className="leading-7">
          This showcase is separate from the registry. Its upstream components
          are installed with <Code>shadcn add</Code>, and its demos for them
          are the example items shadcn publishes alongside each component in
          the base-nova registry (<Code>button-example</Code> and so on), also
          installed with <Code>shadcn add</Code>. Both are committed unedited.
          The only hand-written demos are for our items and for the few
          upstream examples that need Next.js or the AI SDK.
        </p>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="font-heading text-xl font-semibold">Start a new app</h2>
        <Command>{`pnpm dlx shadcn@latest init ${REGISTRY_URL}/base.json -t vite -n my-app`}</Command>
        <p className="leading-7">
          This sets up a base-nova Vite app with the Ocotillo theme, its fonts,
          the mode toggle, and the <Code>@dataservices</Code> registry. Then
          add upstream components by name and ours with the namespace:
        </p>
        <Command>{`pnpm dlx shadcn@latest add button card
pnpm dlx shadcn@latest add @dataservices/app-shell`}</Command>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="font-heading text-xl font-semibold">
          Add it to an existing shadcn app
        </h2>
        <p className="leading-7">
          Register the namespace first. Items that depend on other{" "}
          <Code>@dataservices</Code> items won't install without it.
        </p>
        <Command>{`pnpm dlx shadcn@latest registry add "@dataservices=${REGISTRY_URL}/{name}.json"
pnpm dlx shadcn@latest add @dataservices/theme-ocotillo`}</Command>
        <p className="leading-7">
          Use <Code>theme-weaver</Code> for Weaver. Each page in this showcase
          has the install command for its item.
        </p>
      </section>
    </div>
  )
}
