import { TopNav } from "@/registry/base-nova/blocks/top-nav/top-nav"

const LINKS = [
  { label: "Datasets", href: "#/datasets" },
  { label: "Map", href: "#/map" },
  { label: "About", href: "#/about" },
]

export default function TopNavDemo() {
  return (
    <div>
      <TopNav brand="Weaver" brandHref="#/datasets" links={LINKS} pathname="#/datasets" />
      <div className="mx-auto max-w-7xl space-y-2 px-[clamp(1.25rem,4.4vw,3.5rem)] py-10">
        <h2 className="font-heading text-3xl font-semibold">Datasets</h2>
        <p className="text-muted-foreground">
          Below the md breakpoint, the links move into the menu.
        </p>
      </div>
    </div>
  )
}
