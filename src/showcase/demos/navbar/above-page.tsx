import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  NavBar,
  NavBarActions,
  NavBarBrand,
  NavBarLink,
  NavBarNav,
} from "@/components/ui/navbar"
import { Example } from "@/showcase/example"

export default function NavBarAbovePage() {
  return (
    <div className="flex flex-col gap-4">
      <Example
        label="NavBar (NavBarBrand, NavBarNav, NavBarLink active, NavBarActions) above page content"
        className="items-stretch"
      >
        <Card className="overflow-hidden p-0">
          <div className="flex h-[280px] flex-col">
            <NavBar>
              <NavBarBrand asChild>
                <a href="#/navbar">Weaver</a>
              </NavBarBrand>
              <NavBarNav>
                <NavBarLink href="#/navbar" active>
                  Datasets
                </NavBarLink>
                <NavBarLink href="#/navbar">Map</NavBarLink>
                <NavBarLink href="#/navbar">About</NavBarLink>
              </NavBarNav>
              <NavBarActions>
                <Button size="sm" variant="outline">
                  Sign in
                </Button>
              </NavBarActions>
            </NavBar>
            <div className="flex-1 space-y-2 overflow-auto p-6">
              <h3 className="!text-xl">Datasets</h3>
              <p className="text-muted-foreground">The page scrolls below the bar.</p>
            </div>
          </div>
        </Card>
      </Example>
    </div>
  )
}
