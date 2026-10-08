import * as React from "react"

import { AppShell, type AppShellNavGroup } from "@/blocks/app-shell"
import { Label } from "@/components/ui/label"
import { ModeToggle } from "@/components/mode-toggle"
import { useTheme } from "@/components/theme-provider"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Skeleton } from "@/components/ui/skeleton"
import { Switch } from "@/components/ui/switch"
import {
  CurrentPageContext,
  PAGE_GROUPS,
  PAGES,
  findPage,
} from "@/showcase/pages"
import { PALETTES, PALETTE_STORAGE_KEY } from "@/showcase/palettes"
import { useRoute } from "@/showcase/router"
import { ShowcaseSearch } from "@/showcase/search"

const DS_ONLY_STORAGE_KEY = "dsds-showcase-ds-only"

/** The showcase runs in the AppShell block, with the pages as its nav. */
export function ShowcaseApp() {
  const { slug } = useRoute()
  const page = findPage(slug) ?? PAGES[0]
  const [dsOnly, setDsOnly] = React.useState(
    () => localStorage.getItem(DS_ONLY_STORAGE_KEY) === "true"
  )
  const switchId = React.useId()

  const nav: AppShellNavGroup[] = PAGE_GROUPS.map((group) => ({
    label: group,
    items: PAGES.filter((p) => p.group === group && (!dsOnly || p.origin !== "shadcn")).map(
      (p) => ({
        label: p.title,
        href: `/${p.slug}`,
        // The group already says which are DS; mark the extended shadcn ones.
        badge: p.origin === "extended" ? "Ext" : undefined,
      })
    ),
  })).filter((group) => group.items.length > 0)

  return (
    <AppShell
      brand={
        <>
          Data Services<span className="sr-only"> Design System</span>
        </>
      }
      brandHref="/introduction"
      nav={nav}
      pathname={`/${page.slug}`}
      renderLink={({ href, ...props }) => <a href={`#${href}`} {...props} />}
      collapsible="offcanvas"
      storageKey="showcase"
      beforeNav={
        <div className="flex items-center justify-between gap-2">
          <Label htmlFor={switchId} className="text-xs font-normal text-muted-foreground">
            DS-specific only
          </Label>
          <Switch
            id={switchId}
            size="sm"
            checked={dsOnly}
            onCheckedChange={(checked) => {
              localStorage.setItem(DS_ONLY_STORAGE_KEY, String(checked))
              setDsOnly(checked)
            }}
          />
        </div>
      }
      search={<ShowcaseSearch />}
      actions={<ShowcaseActions />}
    >
      <div className="mx-auto w-full max-w-5xl px-6 py-10 xl:max-w-7xl">
        <CurrentPageContext.Provider value={page}>
          <React.Suspense fallback={<PageSkeleton />}>
            <page.component />
          </React.Suspense>
        </CurrentPageContext.Provider>
      </div>
    </AppShell>
  )
}

function ShowcaseActions() {
  const { palette, setPalette } = useTheme()
  const active = PALETTES.find((p) => p.value === palette) ?? PALETTES[0]
  return (
    <div className="flex items-center gap-2">
      <Select
        value={active.value}
        onValueChange={(value) => {
          localStorage.setItem(PALETTE_STORAGE_KEY, value)
          setPalette(value)
        }}
      >
        <SelectTrigger aria-label="Theme" size="sm" className="w-32" data-tour="theme">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {PALETTES.map((p) => (
            <SelectItem key={p.value} value={p.value}>
              {p.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <span data-tour="mode">
        <ModeToggle />
      </span>
    </div>
  )
}

function PageSkeleton() {
  return (
    <div className="space-y-4" aria-busy="true">
      <Skeleton className="h-10 w-64" />
      <Skeleton className="h-5 w-96 max-w-full" />
      <Skeleton className="h-40 w-full" />
    </div>
  )
}
