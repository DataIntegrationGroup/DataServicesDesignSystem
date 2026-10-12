import { ColorsPage } from "./colors-page"
import { ComponentPage } from "./component-page"
import { GROUPS, PAGES } from "./pages"
import { useSlug } from "./router"
import { ThemeSelect } from "./themes"
import {
  AppShell,
  type AppShellNavGroup,
} from "@/registry/base-nova/app-shell/app-shell"
import { ModeToggle } from "@/registry/base-nova/mode-toggle/mode-toggle"

const NAV: AppShellNavGroup[] = GROUPS.map((group) => ({
  label: group,
  items: PAGES.filter((p) => p.group === group).map((p) => ({
    label: p.title,
    href: `/${p.slug}`,
  })),
}))

export function App() {
  const slug = useSlug()
  const page = PAGES.find((p) => p.slug === slug) ?? PAGES[0]

  return (
    <AppShell
      brand="Data Services"
      brandHref={`/${PAGES[0].slug}`}
      nav={NAV}
      pathname={`/${page.slug}`}
      renderLink={({ href, ...props }) => <a href={`#${href}`} {...props} />}
      collapsible="offcanvas"
      storageKey="showcase"
      actions={
        <>
          <ThemeSelect />
          <ModeToggle />
        </>
      }
    >
      <main className="p-6 lg:p-10">
        <ComponentPage key={page.slug} page={page} />
        {page.slug === "colors" && (
          <div className="mt-6">
            <ColorsPage />
          </div>
        )}
      </main>
    </AppShell>
  )
}
