import * as React from "react"

import { cn } from "@/lib/utils"

/**
 * PageShell — full-viewport app chrome: a flex column on the app background.
 * Put a NavBar (or app header) first, then PageBody / app content.
 */
function PageShell({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="page-shell"
      className={cn(
        "flex h-svh flex-col bg-background text-foreground",
        className
      )}
      {...props}
    />
  )
}

/**
 * Container — a centered, width-capped column. `size="wide"` is for
 * marketing-style pages and uses a fluid gutter. Inside `PageBody bleed`,
 * full-width sections own their background and put a Container inside.
 */
function Container({
  className,
  size = "default",
  ...props
}: React.ComponentProps<"div"> & { size?: "default" | "wide" }) {
  return (
    <div
      data-slot="container"
      data-size={size}
      className={cn(
        "mx-auto w-full max-w-5xl px-6 data-[size=wide]:max-w-7xl data-[size=wide]:px-[clamp(1.25rem,4.4vw,3.5rem)]",
        className
      )}
      {...props}
    />
  )
}

/**
 * PageBody — scrollable content region with a centered, width-capped column.
 * For content pages (home, about, help); the map app uses its own full-bleed
 * layout instead. `bleed` drops the column so pages can have full-width
 * bands; put a Container inside each band.
 */
function PageBody({
  className,
  children,
  bleed = false,
  ...props
}: React.ComponentProps<"main"> & { bleed?: boolean }) {
  return (
    <main
      data-slot="page-body"
      className={cn("flex-1 overflow-y-auto", className)}
      {...props}
    >
      {bleed ? children : <Container className="py-10">{children}</Container>}
    </main>
  )
}

export { PageShell, PageBody, Container }
