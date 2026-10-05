import * as React from "react"
import {
  BookOpenIcon,
  FolderKanbanIcon,
  HomeIcon,
  LifeBuoyIcon,
  MapIcon,
  MapPinIcon,
  SearchIcon,
  UsersIcon,
  WavesIcon,
} from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import {
  AppShell,
  useAppShell,
  useAutoCollapseSidebar,
  type AppShellNavGroup,
} from "@/blocks/app-shell"

// In an app, use your router's location and Link instead of the hash.
function usePathname() {
  return React.useSyncExternalStore(
    (onChange) => {
      window.addEventListener("hashchange", onChange)
      return () => window.removeEventListener("hashchange", onChange)
    },
    () => window.location.hash.slice(1) || "/home"
  )
}

const NAV: AppShellNavGroup[] = [
  {
    items: [
      { label: "Home", href: "/home", icon: HomeIcon },
      { label: "Search", icon: SearchIcon, onSelect: () => toast("Open your search dialog here") },
      { label: "Map", href: "/map", icon: MapIcon },
    ],
  },
  {
    label: "Records",
    items: [
      {
        label: "Wells",
        href: "/wells",
        icon: WavesIcon,
        children: [{ label: "Projects", href: "/wells/projects", icon: FolderKanbanIcon }],
      },
      { label: "Contacts", href: "/contacts", icon: UsersIcon },
      { label: "Locations", href: "/locations", icon: MapPinIcon },
      { label: "Reports", icon: BookOpenIcon, disabled: true },
    ],
  },
]

export default function AppShellDemo() {
  const pathname = usePathname()
  return (
    <AppShell
      brand="Ocotillo"
      brandCollapsed="O"
      brandHref="/home"
      nav={NAV}
      pathname={pathname}
      renderLink={({ href, ...props }) => <a href={`#${href}`} {...props} />}
      header={<span className="truncate text-sm font-medium">{titleOf(pathname)}</span>}
      actions={<HelpButton />}
      footer={
        <div className="flex flex-col gap-1 text-muted-foreground">
          <a href="#/about" className="hover:text-foreground">About</a>
          <span className="text-xs">v1.4.0</span>
        </div>
      }
      footerNav={[{ label: "Get help", icon: LifeBuoyIcon, onSelect: (shell) => shell.togglePanel() }]}
      panelTitle="Get help"
      panel={<p className="p-4 text-sm text-muted-foreground">Help or a form goes here.</p>}
      storageKey="showcase-demo"
    >
      {pathname === "/map" ? <MapPage /> : <Page title={titleOf(pathname)} />}
    </AppShell>
  )
}

function HelpButton() {
  const { togglePanel } = useAppShell()
  return (
    <Button type="button" variant="outline" size="sm" onClick={togglePanel}>
      <LifeBuoyIcon /> Help
    </Button>
  )
}

function titleOf(pathname: string) {
  const items = NAV.flatMap((group) => group.items.flatMap((item) => [item, ...(item.children ?? [])]))
  return items.find((item) => item.href === pathname)?.label ?? "Home"
}

function Page({ title }: { title: string }) {
  return (
    <div className="space-y-4 p-6">
      <h1 className="text-2xl font-semibold">{title}</h1>
      <p className="max-w-prose text-muted-foreground">
        The content area scrolls on its own; the top bar and sidebar stay put.
        Collapse the sidebar to an icon rail with the button in its header or ⌘B.
      </p>
      {Array.from({ length: 12 }, (_, i) => (
        <div key={i} className="h-16 rounded-lg border bg-muted/40" />
      ))}
    </div>
  )
}

function MapPage() {
  // The map needs the width: collapse the sidebar here, restore it on leaving.
  useAutoCollapseSidebar()
  return <div className="h-full bg-muted/60 p-6 text-muted-foreground">Map fills the content area.</div>
}
