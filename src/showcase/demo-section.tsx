import * as React from "react"
import { LinkIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { CurrentPageContext } from "@/showcase/pages"
import { href } from "@/showcase/router"
import { sectionId } from "@/showcase/section-id"

/** A link to a section of the current page (`#/slug/section`). Following it
 *  again after scrolling away scrolls back, though the hash is unchanged. */
export function SectionLink({
  section,
  className,
  children,
}: {
  section: string
  className?: string
  children: React.ReactNode
}) {
  const page = React.useContext(CurrentPageContext)
  const target = href(page?.slug ?? "", section)
  return (
    <a
      href={target}
      className={className}
      onClick={(event) => {
        if (window.location.hash !== target) return
        event.preventDefault()
        document.getElementById(section)?.scrollIntoView()
      }}
    >
      {children}
    </a>
  )
}

/**
 * One example on a page: a linkable h2 (listed under "On this page"), an
 * optional description, actions such as the Code toggle, and the preview.
 */
export function DemoSection({
  name,
  title,
  description,
  actions,
  children,
}: {
  name: string
  title: string
  description?: React.ReactNode
  actions?: React.ReactNode
  children: React.ReactNode
}) {
  const id = sectionId(title)
  return (
    <section id={id} data-demo={name} data-section={title} className="scroll-mt-6 space-y-3">
      <div className="flex flex-wrap items-end justify-between gap-x-4 gap-y-2">
        <div className="space-y-1">
          <h2 className="group/heading !text-xl !leading-snug">
            <SectionLink section={id} className="inline-flex items-center gap-2">
              {title}
              <LinkIcon
                aria-hidden
                className={cn(
                  "size-4 text-muted-foreground opacity-0 transition-opacity",
                  "group-hover/heading:opacity-100 group-focus-within/heading:opacity-100"
                )}
              />
            </SectionLink>
          </h2>
          {description && <p className="text-sm text-muted-foreground">{description}</p>}
        </div>
        {actions && <div className="flex items-center gap-2">{actions}</div>}
      </div>
      {children}
    </section>
  )
}
