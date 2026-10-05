import * as React from "react"
import { ExternalLinkIcon } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { CopyButton } from "@/showcase/code-block"
import {
  CurrentPageContext,
  installCommand,
  pageDescription,
  upstreamDocs,
  type Origin,
  type ShowcasePage,
} from "@/showcase/pages"

const ORIGIN_LABEL: Record<Origin, string> = {
  ds: "DS",
  extended: "Extended",
  shadcn: "shadcn/ui",
}

const ORIGIN_HINT: Record<Origin, string> = {
  ds: "Written for the design system.",
  extended: "Upstream shadcn/ui with variants added by the design system.",
  shadcn: "Upstream shadcn/ui, styled by the theme tokens.",
}

export function OriginBadge({ origin }: { origin: Origin }) {
  return (
    <Badge
      variant={origin === "ds" ? "default" : origin === "extended" ? "info" : "outline"}
      title={ORIGIN_HINT[origin]}
    >
      {ORIGIN_LABEL[origin]}
    </Badge>
  )
}

/** The top of every showcase page: title, origin, description, install
 *  command, and for extended components what the DS adds. */
export function PageHeader({ page }: { page: ShowcasePage }) {
  const description = pageDescription(page)
  const command = installCommand(page)
  return (
    <header className="space-y-4 border-b pb-8">
      <div className="flex flex-wrap items-center gap-3">
        <h1 className="!text-4xl !leading-tight">{page.title}</h1>
        {page.origin && <OriginBadge origin={page.origin} />}
      </div>
      {description && (
        <p className="max-w-3xl text-lg text-muted-foreground">{description}</p>
      )}
      {(command || page.upstream) && (
        <div className="flex flex-wrap items-center gap-3">
          {command && (
            <div className="flex max-w-full min-w-0 items-center gap-1 rounded-lg border bg-muted/40 py-1 pr-1 pl-3 font-mono text-sm">
              <span className="min-w-0 truncate">{command}</span>
              <CopyButton value={command} className="bg-transparent" />
            </div>
          )}
          {page.upstream && (
            <a
              href={upstreamDocs(page.upstream)}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 text-sm font-medium text-primary underline-offset-4 hover:underline"
            >
              shadcn/ui docs <ExternalLinkIcon className="size-3.5" />
            </a>
          )}
        </div>
      )}
      {page.additions && (
        <div className="max-w-3xl rounded-lg border border-info/30 bg-info-soft px-4 py-3 text-sm text-info-strong">
          <div className="font-semibold">Added by the DS</div>
          <ul className="mt-1 list-disc space-y-0.5 pl-5">
            {page.additions.map((addition) => (
              <li key={addition}>{addition}</li>
            ))}
          </ul>
        </div>
      )}
    </header>
  )
}

/** Page body: the current page's header, then demos and sections spaced
 *  evenly. The app shell provides the current page. */
export function PageContent({ children }: { children?: React.ReactNode }) {
  const page = React.useContext(CurrentPageContext)
  if (!page) throw new Error("PageContent must render inside the showcase app")
  return (
    <article className="space-y-10">
      <PageHeader page={page} />
      {children}
    </article>
  )
}
