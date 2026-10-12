import { ColorsPage } from "./colors-page"
import { ComponentPage } from "./component-page"
import { GROUPS, PAGES } from "./pages"
import { useSlug } from "./router"
import { ThemeSelect } from "./themes"
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
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { ModeToggle } from "@/registry/base-nova/mode-toggle/mode-toggle"

export function App() {
  const slug = useSlug()
  const page = PAGES.find((p) => p.slug === slug) ?? PAGES[0]

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader className="px-4 py-3 font-heading font-semibold">
          Data Services Design System
        </SidebarHeader>
        <SidebarContent>
          {GROUPS.map((group) => (
            <SidebarGroup key={group}>
              <SidebarGroupLabel>{group}</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {PAGES.filter((p) => p.group === group).map((p) => (
                    <SidebarMenuItem key={p.slug}>
                      <SidebarMenuButton
                        isActive={p.slug === page.slug}
                        render={<a href={`#/${p.slug}`} />}
                      >
                        {p.title}
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          ))}
        </SidebarContent>
      </Sidebar>
      <SidebarInset>
        <header className="sticky top-0 z-10 flex h-14 items-center gap-2 border-b bg-background px-4">
          <SidebarTrigger />
          <Separator orientation="vertical" className="h-5" />
          <div className="ml-auto flex items-center gap-2">
            <ThemeSelect />
            <ModeToggle />
          </div>
        </header>
        <main className="p-6 lg:p-10">
          {page.slug === "colors" ? (
            <div className="flex flex-col gap-6">
              <ComponentPage page={page} />
              <ColorsPage />
            </div>
          ) : (
            <ComponentPage key={page.slug} page={page} />
          )}
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
