import { Card } from "@/components/ui/card"
import {
  NavBar,
  NavBarBrand,
  NavBarLink,
  NavBarNav,
} from "@/components/ui/navbar"
import { Example } from "@/showcase/example"

export default function NavBarWide() {
  return (
    <>
      <Example
        label='NavBar innerClassName="max-w-7xl" · NavBarLink size="lg" (active sets aria-current="page")'
        className="items-stretch"
      >
        <Card className="overflow-hidden p-0">
          <NavBar innerClassName="max-w-7xl">
            <NavBarBrand asChild>
              <a href="#/navbar">Weaver</a>
            </NavBarBrand>
            <NavBarNav>
              <NavBarLink href="#/navbar" size="lg" active>
                Datasets
              </NavBarLink>
              <NavBarLink href="#/navbar" size="lg">
                Map
              </NavBarLink>
              <NavBarLink href="#/navbar" size="lg">
                About
              </NavBarLink>
            </NavBarNav>
          </NavBar>
        </Card>
      </Example>
    </>
  )
}
