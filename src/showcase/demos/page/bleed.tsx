import { Card } from "@/components/ui/card"
import { NavBar, NavBarBrand } from "@/components/ui/navbar"
import { Container, PageBody, PageShell } from "@/components/ui/page"
import { Example } from "@/showcase/example"

export default function PageBodyBleed() {
  return (
    <div className="flex flex-col gap-4">
      <Example
        label='PageBody bleed: a full-width band and a section, each with a Container size="wide"'
        className="items-stretch"
      >
        <Card className="overflow-hidden p-0">
          <PageShell className="h-[320px]">
            <NavBar innerClassName="max-w-7xl">
              <NavBarBrand>Weaver</NavBarBrand>
            </NavBar>
            <PageBody bleed>
              <section className="bg-primary-dark py-8">
                <Container size="wide">
                  <h3 className="!text-2xl text-on-image">Full-width band</h3>
                  <p className="text-on-image-muted">
                    The section owns the background; the Container keeps text in the column.
                  </p>
                </Container>
              </section>
              <Container size="wide" className="py-8">
                <h3 className="!text-xl">Datasets</h3>
                <p className="text-muted-foreground">
                  Content lines up with the band above.
                </p>
              </Container>
            </PageBody>
          </PageShell>
        </Card>
      </Example>
    </div>
  )
}
