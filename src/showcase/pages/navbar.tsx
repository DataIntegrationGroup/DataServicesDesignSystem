import { Demo } from "@/showcase/demo"
import { PageContent } from "@/showcase/page-header"
import { href } from "@/showcase/router"

export default function NavBarPage() {
  return (
    <PageContent>
      <p className="max-w-3xl rounded-lg border bg-muted/40 px-4 py-3 text-sm">
        For a site's top bar, use the{" "}
        <a className="font-medium text-primary underline underline-offset-4" href={href("top-nav")}>
          Top nav
        </a>{" "}
        block: it's built from NavBar, lines up with wide pages and moves the
        links into a menu on phones. Use NavBar directly for custom bars.
      </p>
      <Demo name="navbar/page-shell" title="In a page shell" />
      <Demo name="navbar/fluid" title="Fluid" />
    </PageContent>
  )
}
