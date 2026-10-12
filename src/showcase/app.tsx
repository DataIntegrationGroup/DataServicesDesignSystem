import type { ReactNode } from "react"

import { ColorsPage } from "./colors-page"
import { ComponentPage } from "./component-page"
import { GROUPS, PAGES } from "./pages"
import { useSlug } from "./router"
import { useShowcaseTheme } from "./theme-items"
import { ThemeSelect } from "./themes"
import { TypographyPage } from "./typography-page"
import {
  AppShell,
  type AppShellNavGroup,
} from "@/registry/base-nova/blocks/app-shell/app-shell"
import { ModeToggle } from "@/registry/base-nova/components/mode-toggle"

const NAV: AppShellNavGroup[] = GROUPS.map((group) => ({
  label: group,
  items: PAGES.filter((p) => p.group === group).map((p) => ({
    label: p.title,
    href: `/${p.slug}`,
  })),
}))

const FOUNDATIONS: Record<string, ReactNode> = {
  colors: <ColorsPage />,
  typography: <TypographyPage />,
}

export function App() {
  const slug = useSlug()
  const page = PAGES.find((p) => p.slug === slug) ?? PAGES[0]
  const [theme, setTheme] = useShowcaseTheme()

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
          <ThemeSelect value={theme} onValueChange={setTheme} />
          <ModeToggle />
        </>
      }
    >
      {/* Remount on a theme change so canvas demos re-read the tokens;
          useCssVars only watches the light/dark class. */}
      <main key={theme} className="p-6 lg:p-10">
        <ComponentPage key={page.slug} page={page} />
        {FOUNDATIONS[page.slug] && (
          <div className="mt-6">{FOUNDATIONS[page.slug]}</div>
        )}
      </main>
    </AppShell>
  )
}
