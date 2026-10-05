import { Card } from "@/components/ui/card"
import { NavBar, NavBarBrand } from "@/components/ui/navbar"
import { PageBody, PageShell } from "@/components/ui/page"
import { Example } from "@/showcase/example"

export default function PageShellExample() {
  return (
    <>
      <Example label="PageShell + NavBar + PageBody" className="items-stretch">
        <Card className="overflow-hidden p-0">
          <PageShell className="h-[240px]">
            <NavBar>
              <NavBarBrand>Weaver</NavBarBrand>
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
    </>
  )
}
