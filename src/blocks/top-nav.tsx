import * as React from "react"
import { MenuIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

export type TopNavLink = { label: string; href: string }

type LinkProps = {
  href: string
  className?: string
  "aria-current"?: "page"
  children: React.ReactNode
}

const defaultLink = (props: LinkProps) => <a {...props} />

/**
 * TopNav block — the navigation bar for content sites (for tool-style apps,
 * use AppShell). The brand sits on the left and the links on the right, in a
 * NavigationMenu; below the md breakpoint they move into a Sheet that opens
 * from the right. The link matching `pathname` is marked current. Pass your
 * router's Link through `renderLink`; `actions`, such as a mode toggle, go
 * after the links.
 *
 *   <TopNav
 *     brand="Weaver"
 *     links={[{ label: "Datasets", href: "/datasets" }]}
 *     pathname={location.pathname}
 *     renderLink={({ href, ...props }) => <Link to={href} {...props} />}
 *   />
 */
export function TopNav({
  brand,
  brandHref = "/",
  links,
  pathname,
  renderLink = defaultLink,
  actions,
  className,
}: {
  brand: React.ReactNode
  brandHref?: string
  links: TopNavLink[]
  pathname?: string
  renderLink?: (props: LinkProps) => React.ReactElement
  actions?: React.ReactNode
  className?: string
}) {
  const [open, setOpen] = React.useState(false)
  const brandLink = renderLink({
    href: brandHref,
    className: "font-heading text-2xl leading-none font-bold text-primary",
    children: brand,
  })

  return (
    <header className={cn("border-b bg-card", className)}>
      {/* max-w-7xl with a gutter that grows with the window. */}
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-[clamp(1.25rem,4.4vw,3.5rem)] py-3">
        {brandLink}
        <div className="flex items-center gap-1 sm:gap-3">
          <NavigationMenu viewport={false} aria-label="Main" className="hidden md:flex">
            <NavigationMenuList className="gap-1">
              {links.map((link) => (
                <NavigationMenuItem key={link.href}>
                  <NavigationMenuLink
                    asChild
                    active={link.href === pathname}
                    className={cn(
                      navigationMenuTriggerStyle(),
                      "text-base text-muted-foreground hover:text-foreground data-active:bg-muted data-active:text-foreground"
                    )}
                  >
                    {renderLink({ href: link.href, children: link.label })}
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
          {actions && <div className="flex items-center gap-1.5 sm:gap-3">{actions}</div>}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="-mr-2 md:hidden" aria-label="Open menu">
                <MenuIcon />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72">
              <SheetHeader>
                <SheetTitle className="sr-only">Menu</SheetTitle>
                <SheetDescription className="sr-only">Site navigation</SheetDescription>
                {brandLink}
              </SheetHeader>
              <nav aria-label="Main" className="flex flex-col gap-1 px-4">
                {links.map((link) => (
                  <Button
                    key={link.href}
                    asChild
                    variant="ghost"
                    className="justify-start text-base aria-[current=page]:bg-muted"
                    onClick={() => setOpen(false)}
                  >
                    {renderLink({
                      href: link.href,
                      "aria-current": link.href === pathname ? "page" : undefined,
                      children: link.label,
                    })}
                  </Button>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
