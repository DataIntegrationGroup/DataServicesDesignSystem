import { ModeToggle } from "@/components/mode-toggle"
import { Card } from "@/components/ui/card"
import { NavBar, NavBarActions, NavBarBrand } from "@/components/ui/navbar"
import { Example } from "@/showcase/example"

export default function NavBarFluid() {
  return (
    <>
      <Example label="NavBar fluid" className="items-stretch">
        <Card className="overflow-hidden p-0">
          <NavBar fluid>
            <NavBarBrand>Map app</NavBarBrand>
            <NavBarActions>
              <ModeToggle />
            </NavBarActions>
          </NavBar>
        </Card>
      </Example>
    </>
  )
}
