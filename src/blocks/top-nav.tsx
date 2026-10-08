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

// A wide row: max-w-7xl with a gutter that grows with the window.
// Both prefixes are needed to replace NavBar's px-4 sm:px-6.
const WIDE_ROW = "max-w-7xl px-[clamp(1.25rem,4.4vw,3.5rem)] sm:px-[clamp(1.25rem,4.4vw,3.5rem)]"

/**
 * TopNav block — the navigation bar for content sites (for tool-style apps,
 * use AppShell). The brand sits on the left and the links on the right;
 * below the md breakpoint the links move into a menu that opens from the
 * right. Pass NavBarLinks (with your router's Link via asChild) as
 * children; they render in both places, and picking one closes the menu.
 * `actions`, such as a mode toggle, go after the links.
 *
 *   <TopNav brand={<NavBarBrand asChild><Link to="/">Weaver</Link></NavBarBrand>}>
 *     <NavBarLink asChild size="lg"><Link to="/datasets">Datasets</Link></NavBarLink>
 *   </TopNav>
 */
export function TopNav({
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
      {brand}
      <div className="flex items-center gap-1 sm:gap-3">
        <NavBarNav aria-label="Main" className="hidden md:flex">
          {children}
        </NavBarNav>
        {actions && <NavBarActions>{actions}</NavBarActions>}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="-mr-2 md:hidden" aria-label="Open menu">
              <MenuIcon />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-72">
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
      </div>
    </NavBar>
  )
}
