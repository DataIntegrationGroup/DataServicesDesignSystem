import * as React from "react"
import { DatabaseIcon } from "lucide-react"

import { Badge } from "@/components/ui/badge"
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
import { Separator } from "@/components/ui/separator"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar"
import { Skeleton } from "@/components/ui/skeleton"
import { Switch } from "@/components/ui/switch"
import {
  CurrentPageContext,
  PAGE_GROUPS,
  PAGES,
  findPage,
  type ShowcasePage,
} from "@/showcase/pages"
import { PALETTES, PALETTE_STORAGE_KEY } from "@/showcase/palettes"
import { href, useRoute } from "@/showcase/router"
import { ShowcaseSearch } from "@/showcase/search"

const DS_ONLY_STORAGE_KEY = "dsds-showcase-ds-only"

export function ShowcaseApp() {
  const { slug } = useRoute()
  const page = findPage(slug) ?? PAGES[0]

  return (
    <SidebarProvider>
      <ShowcaseSidebar current={page} />
      <SidebarInset>
        <ShowcaseHeader />
        <div className="mx-auto w-full max-w-5xl px-6 py-10 xl:max-w-7xl">
          <CurrentPageContext.Provider value={page}>
            <React.Suspense fallback={<PageSkeleton />}>
              <page.component />
            </React.Suspense>
          </CurrentPageContext.Provider>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}

function ShowcaseSidebar({ current }: { current: ShowcasePage }) {
  const { setOpenMobile } = useSidebar()
  const [dsOnly, setDsOnly] = React.useState(
    () => localStorage.getItem(DS_ONLY_STORAGE_KEY) === "true"
  )
  const switchId = React.useId()

  // On phones the sidebar is a sheet; close it once a page is picked.
  React.useEffect(() => {
    setOpenMobile(false)
  }, [current, setOpenMobile])

  return (
    <Sidebar>
      <SidebarHeader className="gap-3 border-b px-4 py-4">
        <a
          href={href("introduction")}
          className="flex items-center gap-2 font-heading text-lg leading-tight font-bold text-sidebar-primary"
        >
          <DatabaseIcon className="size-5 shrink-0" /> DataServices
          <span className="sr-only"> Design System</span>
        </a>
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
      </SidebarHeader>
      <SidebarContent>
        {PAGE_GROUPS.map((group) => {
          const pages = PAGES.filter(
            (p) => p.group === group && (!dsOnly || p.origin !== "shadcn")
          )
          if (pages.length === 0) return null
          return (
            <SidebarGroup key={group}>
              <SidebarGroupLabel>{group}</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {pages.map((p) => (
                    <SidebarMenuItem key={p.slug}>
                      <SidebarMenuButton asChild isActive={p === current} size="sm">
                        <a
                          href={href(p.slug)}
                          aria-current={p === current ? "page" : undefined}
                        >
                          {p.title}
                        </a>
                      </SidebarMenuButton>
                      {p.origin === "ds" && <SidebarMenuBadge>DS</SidebarMenuBadge>}
                      {p.origin === "extended" && <SidebarMenuBadge>Ext</SidebarMenuBadge>}
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          )
        })}
      </SidebarContent>
    </Sidebar>
  )
}

function ShowcaseHeader() {
  const { palette, setPalette } = useTheme()
  const active = PALETTES.find((p) => p.value === palette) ?? PALETTES[0]
  return (
    <header className="sticky top-0 z-20 flex h-14 items-center gap-3 border-b bg-background/90 px-4 backdrop-blur">
      <SidebarTrigger />
      <Separator orientation="vertical" className="h-5!" />
      <span className="hidden font-heading font-semibold md:inline">DataServices Design System</span>
      <Badge variant="secondary" className="hidden md:inline-flex">
        v0.1.0
      </Badge>
      <div className="ml-auto flex items-center gap-2">
        <ShowcaseSearch />
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
    </header>
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
