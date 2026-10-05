import { NavBarBrand, NavBarLink } from "@/components/ui/navbar"
import { Button } from "@/components/ui/button"
import { Container } from "@/components/ui/page"
import { SiteHeader } from "@/blocks/site-header"

export default function SiteHeaderDemo() {
  return (
    <>
      <SiteHeader
        brand={
          <NavBarBrand asChild>
            <a href="#/site-header">Weaver</a>
          </NavBarBrand>
        }
        actions={
          <Button size="sm" variant="outline">
            Sign in
          </Button>
        }
      >
        <NavBarLink href="#/site-header" size="lg" active>
          Datasets
        </NavBarLink>
        <NavBarLink href="#/site-header" size="lg">
          Map
        </NavBarLink>
        <NavBarLink href="#/site-header" size="lg">
          About
        </NavBarLink>
      </SiteHeader>
      <Container size="wide" className="space-y-2 py-10">
        <h2 className="!text-3xl">Datasets</h2>
        <p className="text-muted-foreground">
          The header lines up with Container size="wide". Below the md
          breakpoint, the links move into the menu.
        </p>
      </Container>
    </>
  )
}
