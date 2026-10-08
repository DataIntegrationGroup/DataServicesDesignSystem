import { Demo } from "@/showcase/demo"
import { PageContent } from "@/showcase/page-header"
import { href } from "@/showcase/router"

export default function NavigationMenuPage() {
  return (
    <PageContent>
      <p className="max-w-3xl rounded-lg border bg-muted/40 px-4 py-3 text-sm">
        For a site's top bar, use the{" "}
        <a className="font-medium text-primary underline underline-offset-4" href={href("top-nav")}>
          Top nav
        </a>{" "}
        block, which is built from this menu and moves the links into a sheet on
        phones.
      </p>
      <Demo name="navigation-menu/default" title="Links and a dropdown" />
    </PageContent>
  )
}
