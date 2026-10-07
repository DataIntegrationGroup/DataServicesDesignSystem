import { NavBarBrand, NavBarLink } from "@/components/ui/navbar"
import { Container } from "@/components/ui/page"
import { TopNav } from "@/blocks/top-nav"

export default function TopNavDemo() {
  return (
    <div>
      <TopNav
        brand={
          <NavBarBrand asChild>
            <a href="#/top-nav">Weaver</a>
          </NavBarBrand>
        }
      >
        <NavBarLink href="#/top-nav" size="lg" active>
          Datasets
        </NavBarLink>
        <NavBarLink href="#/top-nav" size="lg">
          Map
        </NavBarLink>
        <NavBarLink href="#/top-nav" size="lg">
          About
        </NavBarLink>
      </TopNav>
      <Container size="wide" className="space-y-2 py-10">
        <h2 className="!text-3xl">Datasets</h2>
        <p className="text-muted-foreground">
          The bar lines up with Container size="wide". Below the md
          breakpoint, the links move into the menu.
        </p>
      </Container>
    </div>
  )
}
