import * as React from "react"
import { ArrowLeftIcon, ArrowRightIcon, ExternalLinkIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { useAppShell } from "@/blocks/app-shell"
import { CopyButton } from "@/showcase/code-block"
import { SectionLink } from "@/showcase/demo-section"
import {
  CurrentPageContext,
  PAGE_GROUPS,
  PAGES,
  installCommand,
  pageDescription,
  upstreamDocs,
  type Origin,
  type ShowcasePage,
} from "@/showcase/pages"
import { href, useRoute } from "@/showcase/router"

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
          <div className="font-semibold">Changed by the DS</div>
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

/** Pages in sidebar order, for Previous/Next. */
const PAGE_ORDER = PAGE_GROUPS.flatMap((group) => PAGES.filter((p) => p.group === group))

type Section = { id: string; title: string }

/**
 * Page body: the current page's header, then its demos and sections, an
 * "On this page" list of the sections on wide screens, and Previous/Next
 * links. Scrolls to the section in the URL (`#/slug/section`), or to the
 * top on a new page. The app shell provides the current page.
 */
export function PageContent({ children }: { children?: React.ReactNode }) {
  const page = React.useContext(CurrentPageContext)
  const { section } = useRoute()
  const { content } = useAppShell()
  const [sections, setSections] = React.useState<Section[]>([])

  // Demos render with the page, so their sections are in the DOM here.
  const collectSections = React.useCallback((article: HTMLElement | null) => {
    if (!article) return
    setSections(
      [...article.querySelectorAll<HTMLElement>("[data-section]")].map((el) => ({
        id: el.id,
        title: el.dataset.section ?? "",
      }))
    )
  }, [])

  React.useEffect(() => {
    if (section) document.getElementById(section)?.scrollIntoView()
    else content?.scrollTo({ top: 0 })
  }, [page, section, content])

  if (!page) throw new Error("PageContent must render inside the showcase app")

  const index = PAGE_ORDER.indexOf(page)
  const previous = PAGE_ORDER[index - 1]
  const next = PAGE_ORDER[index + 1]

  return (
    <div className="xl:grid xl:grid-cols-[minmax(0,1fr)_12rem] xl:gap-12">
      <article ref={collectSections} className="min-w-0 space-y-10">
        <PageHeader page={page} />
        {children}
        <nav aria-label="Pages" className="flex justify-between gap-4 border-t pt-6">
          {previous ? <PagerLink page={previous} direction="previous" /> : <span />}
          {next && <PagerLink page={next} direction="next" />}
        </nav>
      </article>
      {sections.length > 1 && <OnThisPage sections={sections} />}
    </div>
  )
}

function PagerLink({
  page,
  direction,
}: {
  page: ShowcasePage
  direction: "previous" | "next"
}) {
  const Icon = direction === "previous" ? ArrowLeftIcon : ArrowRightIcon
  return (
    <a
      href={href(page.slug)}
      rel={direction === "previous" ? "prev" : "next"}
      className={cn(
        "group flex flex-col gap-0.5 rounded-lg border px-4 py-2.5 text-sm hover:bg-muted",
        direction === "next" && "items-end text-right"
      )}
    >
      <span className="text-muted-foreground">
        {direction === "previous" ? "Previous" : "Next"}
      </span>
      <span className="flex items-center gap-1.5 font-medium">
        {direction === "previous" && <Icon className="size-4" />}
        {page.title}
        {direction === "next" && <Icon className="size-4" />}
      </span>
    </a>
  )
}

/**
 * The page's sections, with the one being read highlighted: the last whose
 * heading has scrolled to the top of the content area (the app shell's
 * scroll container). Short pages can't scroll their last
 * sections that far, so once the page is scrolled to the bottom the section
 * picked from this list (the one in the URL) stays highlighted if it's on
 * screen, and otherwise the last section is.
 */
function OnThisPage({ sections }: { sections: Section[] }) {
  const { section } = useRoute()
  const { content: container } = useAppShell()
  const [active, setActive] = React.useState<string>()

  React.useEffect(() => {
    if (!container) return
    const update = () => {
      const offset = container.getBoundingClientRect().top
      const tops = sections.map(({ id }) => ({
        id,
        top: (document.getElementById(id)?.getBoundingClientRect().top ?? Infinity) - offset,
      }))
      const atBottom =
        container.scrollTop + container.clientHeight >= container.scrollHeight - 2
      const picked = tops.find((t) => t.id === section)
      if (atBottom) {
        const onScreen = picked && picked.top >= 0 && picked.top < container.clientHeight
        setActive(onScreen ? picked.id : tops.at(-1)?.id)
      } else {
        setActive((tops.findLast((t) => t.top <= 64) ?? tops[0])?.id)
      }
    }
    let frame = requestAnimationFrame(update)
    const onScroll = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(update)
    }
    container.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll)
    return () => {
      cancelAnimationFrame(frame)
      container.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
    }
  }, [sections, section, container])

  return (
    <nav aria-label="On this page" className="hidden xl:block">
      <div className="sticky top-10 space-y-2 text-sm">
        <div className="font-medium">On this page</div>
        <ul className="space-y-1.5 border-l">
          {sections.map(({ id, title }) => (
            <li key={id}>
              <SectionLink
                section={id}
                className={cn(
                  "-ml-px block border-l border-transparent pl-3 text-muted-foreground hover:text-foreground",
                  active === id && "border-primary font-medium text-foreground"
                )}
              >
                {title}
              </SectionLink>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}
