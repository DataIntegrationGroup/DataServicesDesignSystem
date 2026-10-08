import { NavBarBrand, NavBarLink } from "@/components/ui/navbar"
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
      <div className="mx-auto max-w-7xl space-y-2 px-[clamp(1.25rem,4.4vw,3.5rem)] py-10">
        <h2 className="!text-3xl">Datasets</h2>
        <p className="text-muted-foreground">
          Below the md breakpoint, the links move into the menu.
        </p>
      </div>
    </div>
  )
}
