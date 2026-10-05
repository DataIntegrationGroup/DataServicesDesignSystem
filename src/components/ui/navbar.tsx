import * as React from "react"
import { Slot } from "radix-ui"

import { cn } from "@/lib/utils"

/**
 * NavBar — top navigation chrome for Data Services apps. Router-agnostic: link
 * elements are passed in via `asChild`, so the consuming app supplies its own
 * router's Link (or a plain `<a>`).
 *
 *   <NavBar>
 *     <NavBarBrand asChild><Link to="/">Weaver</Link></NavBarBrand>
 *     <NavBarNav>
 *       <NavBarLink asChild><Link to="/map">Map</Link></NavBarLink>
 *     </NavBarNav>
 *     <NavBarActions><ModeToggle /></NavBarActions>
 *   </NavBar>
 */
/**
 * `fluid` drops the max-width column. `innerClassName` styles the inner row
 * (e.g. a wider max-width) without reaching in with `[&>div]:` selectors.
 */
function NavBar({
  className,
  innerClassName,
  children,
  fluid = false,
  ...props
}: React.ComponentProps<"header"> & {
  fluid?: boolean
  innerClassName?: string
}) {
  return (
    <header
      data-slot="navbar"
      className={cn("border-b bg-card", className)}
      {...props}
    >
      <div
        className={cn(
          "flex items-center justify-between gap-2 py-3 sm:gap-4",
          fluid ? "px-3 sm:px-5" : "mx-auto max-w-6xl px-4 sm:px-6",
          innerClassName
        )}
      >
        {children}
      </div>
    </header>
  )
}

function NavBarBrand({
  className,
  asChild = false,
  ...props
}: React.ComponentProps<"div"> & { asChild?: boolean }) {
  const Comp = asChild ? Slot.Root : "div"
  return (
    <Comp
      data-slot="navbar-brand"
      className={cn(
        "flex items-baseline gap-2 font-heading text-2xl font-bold leading-none text-primary",
        className
      )}
      {...props}
    />
  )
}

function NavBarNav({ className, ...props }: React.ComponentProps<"nav">) {
  return (
    <nav
      data-slot="navbar-nav"
      className={cn("flex items-center gap-1", className)}
      {...props}
    />
  )
}

/**
 * A nav link. Use `asChild` to render the app's router Link. Mark the active
 * link with the `active` prop, `data-active`, or `aria-current="page"` (most
 * routers set one of these); `active` also sets `aria-current="page"`.
 * `size="lg"` is a larger link for marketing-style headers.
 */
function NavBarLink({
  className,
  asChild = false,
  active,
  size = "default",
  ...props
}: React.ComponentProps<"a"> & {
  asChild?: boolean
  active?: boolean
  size?: "default" | "lg"
}) {
  const Comp = asChild ? Slot.Root : "a"
  return (
    <Comp
      data-slot="navbar-link"
      data-active={active || undefined}
      data-size={size}
      aria-current={active ? "page" : undefined}
      className={cn(
        "rounded-md px-3 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground data-[active]:bg-muted data-[active]:text-foreground aria-[current=page]:bg-muted aria-[current=page]:text-foreground",
        "data-[size=lg]:rounded-lg data-[size=lg]:px-3.5 data-[size=lg]:py-2 data-[size=lg]:text-base",
        className
      )}
      {...props}
    />
  )
}

function NavBarActions({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="navbar-actions"
      className={cn("flex items-center gap-1.5 sm:gap-3", className)}
      {...props}
    />
  )
}

export { NavBar, NavBarBrand, NavBarNav, NavBarLink, NavBarActions }
