import * as React from "react"

import { cn } from "@/lib/utils"
import { Container } from "@/components/ui/page"

/**
 * Hero block — the top band of a landing page: eyebrow, display title,
 * tagline and description on the dark brand color, with room for a search
 * or calls to action. Pair the children with the on-image variants
 * (Button "inverse", Badge "on-image", InputGroup "prominent").
 */
export function Hero({
  eyebrow,
  title,
  tagline,
  description,
  className,
  children,
}: {
  eyebrow?: React.ReactNode
  title: React.ReactNode
  tagline?: React.ReactNode
  description?: React.ReactNode
  className?: string
  children?: React.ReactNode
}) {
  return (
    <section className={cn("bg-primary-dark py-[clamp(3rem,8vw,6rem)]", className)}>
      <Container size="wide" className="flex flex-col gap-5">
        {eyebrow && (
          <p className="text-eyebrow text-on-image-muted uppercase">{eyebrow}</p>
        )}
        <h1 className="font-heading text-display text-on-image">{title}</h1>
        {tagline && (
          <p className="font-heading text-2xl font-semibold text-accent-on-dark md:text-3xl">
            {tagline}
          </p>
        )}
        {description && (
          <p className="max-w-2xl text-lg text-on-image-muted">{description}</p>
        )}
        {children && <div className="mt-3 max-w-2xl space-y-4">{children}</div>}
      </Container>
    </section>
  )
}
