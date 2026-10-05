import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  NavBar,
  NavBarActions,
  NavBarBrand,
  NavBarLink,
  NavBarNav,
} from "@/components/ui/navbar"
import { PageBody, PageShell } from "@/components/ui/page"
import { Example } from "@/showcase/example"

export default function NavBarInPageShell() {
  return (
    <div className="flex flex-col gap-4">
      <Example
        label="PageShell + NavBar (NavBarBrand, NavBarNav, NavBarLink active, NavBarActions) + PageBody"
        className="items-stretch"
      >
        <Card className="overflow-hidden p-0">
          <PageShell className="h-[280px]">
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
            <PageBody>
              <h3 className="!text-xl">Datasets</h3>
              <p className="text-muted-foreground">
                PageBody scrolls and centers its content column.
              </p>
            </PageBody>
          </PageShell>
        </Card>
      </Example>
    </div>
  )
}
