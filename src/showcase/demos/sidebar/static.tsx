import {
  ActivityIcon,
  DatabaseIcon,
  MapIcon,
  SettingsIcon,
} from "lucide-react"

import { Card } from "@/components/ui/card"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from "@/components/ui/sidebar"
import { Example } from "@/showcase/example"

export default function SidebarStatic() {
  return (
    <div className="flex flex-col gap-4">
      <Example
        label='Sidebar collapsible="none", SidebarMenuButton isActive, SidebarMenuBadge'
        className="items-stretch"
      >
        <Card className="h-[360px] overflow-hidden p-0">
          <SidebarProvider className="h-full min-h-0!">
            <Sidebar collapsible="none" className="border-r">
              <SidebarHeader>
                <div className="flex items-center gap-2 px-2 py-1 font-heading text-lg font-bold text-sidebar-primary">
                  <DatabaseIcon className="size-5" /> DataServices
                </div>
              </SidebarHeader>
              <SidebarContent>
                <SidebarGroup>
                  <SidebarGroupLabel>Platform</SidebarGroupLabel>
                  <SidebarGroupContent>
                    <SidebarMenu>
                      <SidebarMenuItem>
                        <SidebarMenuButton isActive>
                          <DatabaseIcon /> Sources
                        </SidebarMenuButton>
                        <SidebarMenuBadge>4</SidebarMenuBadge>
                      </SidebarMenuItem>
                      <SidebarMenuItem>
                        <SidebarMenuButton>
                          <MapIcon /> Map
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                      <SidebarMenuItem>
                        <SidebarMenuButton>
                          <ActivityIcon /> Monitoring
                        </SidebarMenuButton>
                        <SidebarMenuBadge>2</SidebarMenuBadge>
                      </SidebarMenuItem>
                    </SidebarMenu>
                  </SidebarGroupContent>
                </SidebarGroup>
                <SidebarGroup>
                  <SidebarGroupLabel>System</SidebarGroupLabel>
                  <SidebarGroupContent>
                    <SidebarMenu>
                      <SidebarMenuItem>
                        <SidebarMenuButton>
                          <SettingsIcon /> Settings
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    </SidebarMenu>
                  </SidebarGroupContent>
                </SidebarGroup>
              </SidebarContent>
            </Sidebar>
            <div className="flex flex-1 flex-col gap-2 p-6">
              <h3 className="!text-xl">Sources</h3>
              <p className="text-muted-foreground">
                Main content area beside the sidebar.
              </p>
            </div>
          </SidebarProvider>
        </Card>
      </Example>
    </div>
  )
}
