import * as React from "react"
import { MenuIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { NavBar, NavBarActions, NavBarNav } from "@/components/ui/navbar"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

// Matches Container size="wide", so the header lines up with wide pages.
// Both prefixes are needed to replace NavBar's px-4 sm:px-6.
const WIDE_ROW = "max-w-7xl px-[clamp(1.25rem,4.4vw,3.5rem)] sm:px-[clamp(1.25rem,4.4vw,3.5rem)]"

/**
 * SiteHeader block — the site-wide header for content pages. Links sit in
 * the bar from the md breakpoint and move into a menu sheet below it.
 * Pass NavBarLinks (with your router's Link via asChild) as children; they
 * render in both places, and picking one closes the menu.
 *
 *   <SiteHeader brand={<NavBarBrand asChild><Link to="/">Weaver</Link></NavBarBrand>}>
 *     <NavBarLink asChild size="lg"><Link to="/datasets">Datasets</Link></NavBarLink>
 *   </SiteHeader>
 */
export function SiteHeader({
  brand,
  actions,
  className,
  children,
}: {
  brand: React.ReactNode
  actions?: React.ReactNode
  className?: string
  children: React.ReactNode
}) {
  const [open, setOpen] = React.useState(false)
  return (
    <NavBar className={className} innerClassName={WIDE_ROW}>
      <div className="flex items-center gap-1">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="-ml-2 md:hidden" aria-label="Open menu">
              <MenuIcon />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-72">
            <SheetHeader>
              {/* brand can be a block element, which a heading can't hold. */}
              <SheetTitle className="sr-only">Menu</SheetTitle>
              <SheetDescription className="sr-only">Site navigation</SheetDescription>
              {brand}
            </SheetHeader>
            <nav
              aria-label="Main"
              className="flex flex-col gap-1 px-4"
              onClick={(event) => {
                if ((event.target as HTMLElement).closest("a")) setOpen(false)
              }}
            >
              {children}
            </nav>
          </SheetContent>
        </Sheet>
        {brand}
      </div>
      <NavBarNav aria-label="Main" className="hidden md:flex">
        {children}
      </NavBarNav>
      {actions && <NavBarActions>{actions}</NavBarActions>}
    </NavBar>
  )
}
